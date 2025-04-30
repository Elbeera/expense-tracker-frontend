import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Expense } from "../../graphql/types";
import WatchTowrButton from "../common/WatchTowrButton";
import { DELETE_EXPENSE } from "../../graphql/mutations";
import { GET_EXPENSES } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

interface ExpenseDetailModalProps {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  expense,
  isOpen,
  onClose,
}) => {
  const [deleteExpense, { loading: deleting }] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSES }],
    awaitRefetchQueries: true,
  });
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteExpense({
        variables: {
          id: expenseId,
        },
      });
      onClose();
    } catch (err) {
      console.error("Error deleting expense", err);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Expense Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="bold">Expense:</Text>
              <Text>{expense.title}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Amount:</Text>
              <Text>£{expense.amount}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Category:</Text>
              <Text>{expense.category}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Date:</Text>
              <Text>{new Date(expense.createdAt).toLocaleDateString()}</Text>
            </Box>
            {/* <Box>
              <Text fontWeight="bold">Time:</Text>
              <Text>
                {new Date(expense.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </Box> */}
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent={"space-around"}>
          <WatchTowrButton
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteExpense(expense.id);
            }}
            mt={2}
            isLoading={deleting}
            my={2}
          >
            Delete Expense
          </WatchTowrButton>
          <WatchTowrButton colorScheme="blue" onClick={onClose}>
            Close
          </WatchTowrButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseDetailModal;
