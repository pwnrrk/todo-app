import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  FlatList,
  ListRenderItem,
} from "react-native";
import Text from "../components/Text";
import Todo from "../interfaces/todo";
import { Scheme } from "../utils/color";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

export default function Done() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [focusedTask, setFocusedTask] = useState("");

  const todoStore = useAsyncStorage("todoList");

  const getList = () => {
    todoStore.getItem().then((list) => {
      if (list) setTodoList(JSON.parse(list) as Todo[]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

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
    const index = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(index, 1);
    todoStore.setItem(JSON.stringify(todoList), () => getList());
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
    backgroundColor: Scheme.green,
    marginBottom: 4,
    borderRadius: 8,
  },
});
