import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  TouchableOpacityProps,
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

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [focusedTask, setFocusedTask] = useState("");

  const listStorage = useAsyncStorage("todoList");

  const getList = () => {
    listStorage.getItem().then((result) => {
      if (result) setTodos(JSON.parse(result) as Todo[]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const AddTaskForm = () => {
    const [taskToAdd, setTaskToAdd] = useState("");
    const addTodo = () => {
      todos.push({
        id: generateId(),
        title: taskToAdd,
        done: false,
      });
      listStorage.setItem(JSON.stringify(todos));
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

  const ListItemButton = (
    props: {
      icon: string;
      iconColor: string;
      title: string;
    } & TouchableOpacityProps
  ) => {
    return (
      <View>
        <TouchableOpacity
          {...props}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 4,
            paddingHorizontal: 8,
            marginBottom: 4,
            borderRadius: 8,
            elevation: 5,
            backgroundColor: Scheme.dark,
          }}
        >
          <AntDesignIcons
            name={props.icon}
            size={24}
            color={props.iconColor}
            style={{ marginRight: 8 }}
          />
          <Text>{props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const deleteTask = (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    listStorage.setItem(JSON.stringify(todos), () => getList());
  };

  const doneTask = (id: string) => {
    const task = todos.find((todo) => todo.id === id);
    if (task) task.done = true;
    listStorage.setItem(JSON.stringify(todos), () => getList());
  };

  const Todo = ({ value }: { value: Todo }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 18 }}
          onPress={() =>
            setFocusedTask(focusedTask === value.id ? "" : value.id)
          }
        >
          <Text>{value.title}</Text>
        </TouchableOpacity>
        {focusedTask === value.id && (
          <View
            style={{
              paddingVertical: 8,
              paddingLeft: 18,
              paddingHorizontal: 18,
              backgroundColor: Scheme.lightGray,
            }}
          >
            <ListItemButton
              title="Done"
              icon="check"
              iconColor={Scheme.light}
              onPress={() => doneTask(value.id)}
            />
            <ListItemButton title="Edit" icon="edit" iconColor={Scheme.light} />
            <ListItemButton
              title="Delete"
              icon="delete"
              iconColor={Scheme.red}
              onPress={() => deleteTask(value.id)}
            />
          </View>
        )}
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
        data={todos.filter((todo) => !todo.done)}
        keyExtractor={(todo) => todo.id}
      />
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
  item: {
    backgroundColor: Scheme.gray,
    marginBottom: 4,
    borderRadius: 8,
  },
});
