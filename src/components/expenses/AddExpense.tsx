import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  useDisclosure,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE, DELETE_ALL_EXPENSES } from "../../graphql/mutations";
import { GET_EXPENSES } from "../../graphql/queries";
import WatchTowrButton from "../common/WatchTowrButton";

export default function AddExpenseModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("£0.00");
  const [category, setCategory] = useState("");
  const [createdAt, setCreatedAt] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const [addExpense, { loading }] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSES }],
    awaitRefetchQueries: true,
  });

  const [deleteAllExpenses, { loading: deleting }] = useMutation(
    DELETE_ALL_EXPENSES,
    {
      refetchQueries: [{ query: GET_EXPENSES }],
      awaitRefetchQueries: true,
    }
  );

  const handleSubmit = async () => {
    if (!title || !amount || !category) return;

    // const currentCreatedAt = new Date().toISOString();
    const currentCreatedAt = new Date(createdAt).toISOString();

    try {
      await addExpense({
        variables: {
          title,
          amount: +amount,
          category,
          createdAt: currentCreatedAt,
        },
      });

      setTitle("");
      setAmount("");
      setCategory("");
      setCreatedAt(new Date().toISOString().split("T")[0]);
      onClose();
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllExpenses();
    } catch (err) {
      console.error("Error deleting all expenses", err);
    }
  };

  // 🔥 Category options
  const categories = [
    "🍔 Food",
    "✈️ Transport",
    "🍿 Entertainment",
    "⚡️ Utilities",
    "🏥 Health",
    "🛍️ Shopping",
    "🎓 Education",
    "Other",
  ];

  return (
    <>
      <Flex justify="space-evenly" mb={6} wrap="wrap" gap={4}>
        <WatchTowrButton onClick={onOpen} colorScheme="teal">
          Add Expense
        </WatchTowrButton>
        <WatchTowrButton
          onClick={handleDeleteAll}
          colorScheme="red"
          isLoading={deleting}
        >
          Delete All Expenses
        </WatchTowrButton>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input
                placeholder="Expense"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {/* ✅ New: Category Select */}
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
              <Input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <WatchTowrButton
              colorScheme="teal"
              mr={3}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Save
            </WatchTowrButton>
            <WatchTowrButton colorScheme="red" onClick={onClose}>
              Cancel
            </WatchTowrButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
