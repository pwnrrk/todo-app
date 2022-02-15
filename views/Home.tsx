import { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import Text from "../components/Text";
import Button from "../components/Button";
import { Scheme } from "../utils/color";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState<string[]>([]);

  const AddTaskForm = () => {
    const [taskToAdd, setTaskToAdd] = useState("");
    const addTodo = () => {
      todos.push(taskToAdd);
      setModalOpen(false);
      setTaskToAdd("");
    };
    return (
      <View style={styles.modalBody}>
        <Text style={styles.modalTitle}>Add Task</Text>
        <Input
          placeholder="title"
          value={taskToAdd}
          onChangeText={setTaskToAdd}
          style={{ marginBottom: 18 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{ backgroundColor: Scheme.red, marginRight: 8 }}
            onPress={() => setModalOpen(false)}
          >
            <Text>Cancel</Text>
          </Button>
          <Button onPress={() => addTodo()}>
            <Text>Ok</Text>
          </Button>
        </View>
      </View>
    );
  };

  const todoList = todos.map((todo, index) => <Text key={index}>{todo}</Text>);

  return (
    <View style={styles.container}>
      {todoList}
      <Modal
        animationType="slide"
        style={{ flex: 1 }}
        transparent={true}
        visible={isModalOpen}
      >
        <AddTaskForm />
      </Modal>
      <ActionButton onPress={() => setModalOpen(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  modalBody: {
    position: "absolute",
    backgroundColor: Scheme.gray,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.9,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 18,
  },
});
