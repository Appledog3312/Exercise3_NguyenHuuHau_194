import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from 'react-native';
import { Appbar, TextInput, Button, List } from 'react-native-paper'; 
import firestore from '@react-native-firebase/firestore';
import Todo from './Todo';

function App() {
  const [todo, setTodo] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([]);
  const [tooltipContent, setTooltipContent] = React.useState(null);

  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  async function deleteTodo(id) {
    await ref.doc(id).delete();
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  async function confirmDelete(id) {
    Alert.alert(
      'Xóa thành công',
      'Bạn có muốn xóa ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteTodo(id) }
      ],
      { cancelable: true }
    );
  }

  React.useEffect(() => {
    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [loading, ref]);

  if (loading) {
    return null; 
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="TODOS List" style={{ alignItems: 'center' }} />
          <Appbar.Action icon="dots-vertical" onPress={() => console.log('Settings pressed')} />
        </Appbar.Header>
        <View style={styles.listContainer}>
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setTooltipContent(item.title)}
                onMouseEnter={() => setTooltipContent(item.title)}
                onMouseLeave={() => setTooltipContent(null)}
                activeOpacity={0.8}
              >
                <View style={styles.todoItem}>
                  <Todo {...item} />
                  <List.Icon
                    icon="delete"
                    color="red"
                    onPress={() => confirmDelete(item.id)}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label="New Todo...."
            value={todo}
            onChangeText={text => setTodo(text)}
          />
          <Button style={styles.button} mode="contained" onPress={addTodo}>
            Add Todo
          </Button>
        </View>
        {tooltipContent && (
          <View style={styles.tooltip}>
            <Text>{tooltipContent}</Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'gray', 
    borderRadius: 10, 
    margin: 10, 
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 6,
  },
  button: {
    marginLeft: 8,
    backgroundColor: "gray",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 6,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 8,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    zIndex: 999,
  },
});
