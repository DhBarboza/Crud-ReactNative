import React, { useEffect,  useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import firebase from '../database/firebase';

const ItemDetail = (props) => {

    const [anotation, setAnotation] = useState({
        id: '',
        title: '',
        name: '',
        description: ''
    });

    const [loading, setLoading] = useState(true)

    //Obter o item a partir do ItemId passa na outra tela:
    useEffect(() => {
        getItemById(props.route.params.itemId);
    },[]);

    const getItemById = async (id) => {
        const dbRef = firebase.db.collection('anotations').doc(id);
        const doc = await dbRef.get();
        const item = doc.data();
        console.log(item)
        setAnotation({
            ...anotation,
            id: doc.id,
            title: item.title,
            name: item.name,
            description: item.description
        })
        setLoading(false)
    }


    const changeText = (item, value) => {
        setAnotation({ ...anotation, [item]: value})
    }

    const deleteItem = async () => {
        const dbRef = firebase.db.collection('anotations').doc(props.route.params.itemId);
        await dbRef.delete()
        props.navigation.navigate('ItemsList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Remover Anotação', 'Tem certeza que deseja excluir?', [
            {text: 'Sim', onPress: () => deleteItem()},
            {text: 'Não', onPress: () => console.log(false)},

        ])
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Título da Anotação" value={anotation.title} onChangeText={(value) => changeText('title', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Nome do País" value={anotation.name} onChangeText={(value) => changeText('name', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder="Descrição" value={anotation.description} onChangeText={(value) => changeText('description', value)}/>
        </View>
        <View>
            <Button color="#19AC52" title="Salvar" onPress={() => alert('Item Atualizado')}/>
        </View>
        <View>
            <Button color="#E31030" title="Deletar" onPress={() => openConfirmationAlert()}/>
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

export default ItemDetail
