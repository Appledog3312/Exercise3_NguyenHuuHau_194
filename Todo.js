import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; 
function Todo({ id, title, complete }) {
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        complete: !complete,
      });
  }

  return (
    <List.Item
      title={title}
      onPress={() => toggleComplete()}
      left={(props) => (
        <Icon name={complete ? 'check' : 'times'} size={20} color={complete ? 'green' : 'red'} />
      )}
    />
  );
}

export default Todo;
