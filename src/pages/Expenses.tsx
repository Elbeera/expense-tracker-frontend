import { Box, Divider, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../graphql/queries";
import { Expense } from "../graphql/types";
import AddExpenseModal from "../components/expenses/AddExpense";
import ExpensesDropdown from "../components/expenses/ExpensesDropdown";
import NavBar from "../components/layout/NavBar";

const Expenses = () => {
  const { data, loading, error } = useQuery(GET_EXPENSES);

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

  const calculateTotalForAllDays = () => {
    let total = 0;
    Object.keys(groupedExpenses).forEach((date) => {
      Object.keys(groupedExpenses[date]).forEach((category) => {
        const categoryExpenses = groupedExpenses[date][category];
        total += categoryExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
      });
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
    <VStack
      align="stretch"
      py={10}
      width={"75%"}
      justify={"center"}
      justifySelf={"center"}
    >
      <NavBar />
      <Divider />
      <Box justifyItems={"center"}>
        <Text fontSize="xl" fontWeight="bold" color="teal.600">
          Total Expenses: £{calculateTotalForAllDays().toFixed(2)}
        </Text>
      </Box>
      <AddExpenseModal />
      <ExpensesDropdown />
    </VStack>
  );
};

export default Expenses;
