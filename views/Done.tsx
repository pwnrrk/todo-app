import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import Text from "../components/Text";
import Todo from "../interfaces/todo";
import { Scheme } from "../utils/color";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { format } from "date-fns";

export default function Done() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const todoStore = useAsyncStorage("todoList");

  const getList = () => {
    todoStore.getItem().then((list) => {
      if (list) setTodoList(JSON.parse(list) as Todo[]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const deleteTask = (id: string) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(index, 1);
    todoStore.setItem(JSON.stringify(todoList), () => getList());
  };

  const Todo = ({ value }: { value: Todo }) => {
    return (
      <View style={[styles.item]}>
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

  const todoItems: ListRenderItem<Todo> = ({ item }) => <Todo value={item} />;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
        Done
      </Text>
      <FlatList
        renderItem={todoItems}
        data={todoList.filter((todo) => todo.done)}
        keyExtractor={(todo) => todo.id}
      />
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
