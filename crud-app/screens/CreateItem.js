import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase';


const CreateItem = (props) => {
    // Criar um estado:
    const [state, setState] = useState({
        title: '',
        name: '',
        description: ''
    });

    const createNewAnotation = async () => {
        if(state.title === '') {
            alert('Adicione um título para identificação')
        } else {
            try {
                await firebase.db.collection('anotations').add({
                    title: state.title,
                    name: state.name,
                    description: state.description,
                })
                props.navigation.navigate('ItemsList');

            } catch (error) {
                console.log(error);
            }
        }
    }

    // Declarando função de manipulação de estado:
    const changeText = (name, value) => {
        setState({ ...state, [name]: value})
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Título da Anotação" onChangeText={(value) => changeText('title', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nome do País" onChangeText={(value) => changeText('name', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Descrição" onChangeText={(value) => changeText('description', value)}/>
            </View>
            <View>
                <Button title="Salvar" onPress={() => createNewAnotation()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    inputGroup: {
        flex: 1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateItem
