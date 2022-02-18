import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import ActionButton from "../components/ActionButton";
import Input from "../components/Input";
import Text from "../components/Text";
import Button from "../components/Button";
import { Scheme } from "../utils/color";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Todo from "../interfaces/todo";
import generateId from "../utils/generateId";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { format } from "date-fns";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const listStorage = useAsyncStorage("todoList");

  const getList = () => {
    listStorage.getItem().then((result) => {
      if (result) setTodos(JSON.parse(result) as Todo[]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const isEmpty = (str: string) => !str || /^\s*$/.test(str);

  const AddTaskForm = () => {
    const [taskToAdd, setTaskToAdd] = useState("");
    const addTodo = () => {
      if (isEmpty(taskToAdd)) return;
      todos.push({
        id: generateId(),
        title: taskToAdd,
        done: false,
        createdAt: new Date(),
      });
      listStorage.setItem(JSON.stringify(todos));
      setModalOpen(false);
      setTaskToAdd("");
    };

    return (
      <Modal
        animationType="slide"
        onDismiss={() => setTaskToAdd("")}
        style={{ flex: 1 }}
        transparent={true}
        visible={isModalOpen}
      >
        <TouchableOpacity
          style={{ flex: 1, opacity: 0 }}
          onPress={() => setModalOpen(false)}
        ></TouchableOpacity>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Add Task</Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 18,
              alignItems: "center",
            }}
          >
            <Input
              placeholder="title"
              value={taskToAdd}
              onChangeText={setTaskToAdd}
              style={{ flex: 1, marginRight: 4 }}
              keyboardAppearance="dark"
              onSubmitEditing={addTodo}
            />
            <Button onPress={addTodo}>
              <Text>Ok</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  const deleteTask = (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    listStorage.setItem(JSON.stringify(todos), () => getList());
  };

  const doneTask = (id: string) => {
    const task = todos.find((todo) => todo.id === id);
    if (task) task.done = !task.done;
    listStorage.setItem(JSON.stringify(todos), () => getList());
  };

  const Todo = ({ value }: { value: Todo }) => {
    return (
      <View style={[styles.item]}>
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => doneTask(value.id)}
        >
          <AntDesignIcons
            size={18}
            color={Scheme.light}
            name={value.done ? "checkcircle" : "checkcircleo"}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            textDecorationLine: value.done ? "line-through" : "none",
            flex: 1,
          }}
        >
          {value.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: Scheme.lightGray,
            paddingHorizontal: 4,
          }}
        >
          {`${format(new Date(value.createdAt), "d MMMM yyyy HH:mm")}`}
        </Text>
        <TouchableOpacity onPress={() => deleteTask(value.id)}>
          <AntDesignIcons name="delete" color={Scheme.red} size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  const todoList: ListRenderItem<Todo> = ({ item }) => <Todo value={item} />;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
        Tasks
      </Text>
      <FlatList
        renderItem={todoList}
        data={todos.filter(
          (todo) => new Date(todo.createdAt).getDate() == new Date().getDate()
        )}
        keyExtractor={(todo) => todo.id}
      />
      <AddTaskForm />
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
  item: {
    backgroundColor: Scheme.gray,
    borderRadius: 8,
    marginBottom: 4,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
