import React, { useEffect } from 'react';
import { FlatList, Text, View, Image, Pressable, TextInput, StyleSheet, Button } from 'react-native';
import { useRecoilState } from 'recoil';
import { todoState } from './recoil/todoAtom';

export default function Screen02({ navigation, route }) {
  const { tit } = route.params;
  const [{ items, loading }, setTodoState] = useRecoilState(todoState);
  const [newTodo, setNewTodo] = React.useState('');
  const [editId, setEditId] = React.useState(null);
  const [editTodo, setEditTodo] = React.useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTodoState(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch('https://66ff34f02b9aac9c997e841a.mockapi.io/api/todo');
      const data = await response.json();
      setTodoState({ items: data, loading: false });
    } catch (error) {
      console.log(error);
      setTodoState(prev => ({ ...prev, loading: false }));
    }
  };

  const addToDo = async () => {
    if (!newTodo) return;

    const response = await fetch('https://66ff34f02b9aac9c997e841a.mockapi.io/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setTodoState(prev => ({ ...prev, items: [...prev.items, data] }));
      setNewTodo('');
    }
  };

  const updateTodo = async () => {
    if (!editTodo) return;

    const response = await fetch(`https://66ff34f02b9aac9c997e841a.mockapi.io/api/todo/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editTodo }),
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodoState(prev => ({
        ...prev,
        items: prev.items.map(item => (item.id === editId ? updatedTodo : item)),
      }));
      setEditId(null);
      setEditTodo('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          <Image 
            source={require('./Icon11.png')}
            style={{ width: 36, height: 36, marginTop: 10, marginLeft: 10 }}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.text1}>Hi {tit}</Text>
          <Text style={styles.text2}>Have a great day ahead</Text>
        </View>
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <Pressable style={styles.view}>
          <Image source={require("./find.png")} style={{ width: 20, height: 20, marginLeft: 10 }} />
          <Text style={styles.text2}>Search</Text>
        </Pressable>
      </View>
      <View style={{ flex: 8, alignItems: "center" }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemView}>
              {editId === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editTodo}
                    onChangeText={setEditTodo}
                  />
                  <Button title="Update Todo" onPress={updateTodo} />
                </>
              ) : (
                <>
                  <Text style={styles.text2}>{item.name}</Text>
                  <Pressable
                    style={{ width: 20, height: 20 }}
                    onPress={() => {
                      setEditId(item.id);
                      setEditTodo(item.name);
                    }}
                  >
                    <Image source={require("./edit.png")} style={{ width: 20, height: 20 }} />
                  </Pressable>
                </>
              )}
            </View>
          )}
        />
        <TextInput
          style={{ width: 300, height: 50, borderRadius: 3, borderWidth: 2, borderColor: "#00BDD6", marginLeft: 20 }}
          placeholder="   Input your job"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Pressable style={styles.pressAdd} onPress={addToDo}>
          +
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  text2: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '400',
    width: 210,
  },
  view: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#9095A0",
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  pressAdd: {
    width: 70,
    height: 70,
    backgroundColor: "#00BDD6",
    borderRadius: 40,
    color: "#FFFFFF",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  itemView: {
    width: 300,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DEE1E62B",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
