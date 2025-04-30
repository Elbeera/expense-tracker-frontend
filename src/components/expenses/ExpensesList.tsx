import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  useDisclosure,
  Collapse,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../../graphql/queries";
import { Expense } from "../../graphql/types";
import ExpenseDetailModal from "./ExpenseDetailModal";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const THRESHOLD = 100;

const ExpensesList = () => {
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null
  );
  const [openDates, setOpenDates] = useState<Record<string, boolean>>({});

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    onOpen();
  };

  const toggleDate = (date: string) => {
    setOpenDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const groupByDateAndCategory = (expenses: Expense[]) => {
    const groupedExpenses: Record<string, Record<string, Expense[]>> = {};

    expenses.forEach((expense) => {
      const date = expense.createdAt.split("T")[0];
      const category = expense.category;

      if (!groupedExpenses[date]) {
        groupedExpenses[date] = {};
      }

      if (!groupedExpenses[date][category]) {
        groupedExpenses[date][category] = [];
      }

      groupedExpenses[date][category].push(expense);
    });

    return groupedExpenses;
  };

  const calculateCategoryTotal = (categoryExpenses: Expense[]) => {
    return categoryExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  };

  const calculateTotalForDay = (date: string) => {
    let total = 0;
    Object.keys(groupedExpenses[date]).forEach((category) => {
      const categoryExpenses = groupedExpenses[date][category];
      total += categoryExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
    });
    return total;
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error fetching expenses. Please try again later.</Text>;
  }

  const groupedExpenses = data ? groupByDateAndCategory(data.getExpenses) : {};

  return (
    <VStack align="stretch" px={4}>
      {Object.keys(groupedExpenses)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((date) => (
          <Box key={date}>
            <Flex
              justifyContent={"space-between"}
              onClick={() => toggleDate(date)}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                borderColor: "teal.300",
              }}
              borderWidth="2px"
              borderRadius="lg"
              my={3}
              p={2}
            >
              <Heading size="md" color="teal.600" cursor="pointer">
                {new Date(date).toLocaleDateString()}
              </Heading>
              <Text color="teal.600" fontWeight="bold" alignSelf="center">
                Day's total: £{calculateTotalForDay(date).toFixed(2)}
              </Text>
              <IconButton
                icon={
                  openDates[date] ? (
                    <ChevronUpIcon color={"teal.600"} />
                  ) : (
                    <ChevronDownIcon color={"teal.600"} />
                  )
                }
                variant="link"
                aria-label={openDates[date] ? "Collapse" : "Expand"}
              />
            </Flex>
            <Divider />
            <Collapse in={openDates[date]}>
              {Object.keys(groupedExpenses[date]).map((category) => {
                const categoryExpenses = groupedExpenses[date][category];
                const categoryTotal = calculateCategoryTotal(categoryExpenses);

                return (
                  <Box key={category} mb={6} justifyItems="center">
                    {categoryTotal > THRESHOLD && categoryTotal > 0 && (
                      <Text color="red.500" fontWeight="bold" mb={4}>
                        You have spent a lot on {category} today!
                      </Text>
                    )}

                    {categoryExpenses.map((expense) => (
                      <Card
                        key={expense.id}
                        mt={4}
                        onClick={() => handleExpenseClick(expense)}
                        cursor="pointer"
                        width={"75%"}
                        _hover={{
                          transform: "scale(1.05)",
                          boxShadow: "lg",
                          borderColor: "teal.300",
                        }}
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        transition="all 0.2s ease-in-out"
                      >
                        <CardHeader>
                          <Heading size="sm">{expense.title}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>Amount: £{expense.amount}</Text>
                          {/* <Text>
                            Time:
                            {new Date(expense.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </Text> */}
                        </CardBody>
                      </Card>
                    ))}
                  </Box>
                );
              })}
            </Collapse>
          </Box>
        ))}
      {selectedExpense && (
        <ExpenseDetailModal
          expense={selectedExpense}
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetch}
        />
      )}
    </VStack>
  );
};

export default ExpensesList;
