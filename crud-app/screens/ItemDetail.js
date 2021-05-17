import React, { useEffect,  useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import firebase from '../database/firebase';

const ItemDetail = (props) => {

    const [itemobj, setItemobj] = useState({
        id: '',
        title: '',
        name: '',
        description: ''
    })

    const [loading, setLoading] = useState(true)

    const getItemById = async(id) => {
        const dbRef = firebase.db.collection('anotations').doc(id);
        const dbDoc = await dbRef.get();
        const item = dbDoc.data();
        console.log(item)
        setItemobj({
            ...itemobj,
            id: dbDoc.id,
        })
        setLoading(false)
    }

    //Obter o item a partir do ItemId passa na outra tela:
    useEffect(() => {
        getItemById(props.route.params.itemId);
    },[]);

    const changeText = (name, value) => {
        setItemobj({ ...itemobj, [name]: value})
    }

    const deleteItem = async () => {
        const dbRef = firebase.db.collection('anotations').doc(props.route.params.itemId);
        await dbRef.delete()
        props.navigation.navigate('ItemsList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Remover Anotação', 'Tem certeza que deseja excluir?', [
            {text: 'Sim', onPress: () => deleteItem()},
            {text: 'Não', onPress: () => console.log('Cancelado')},

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
            <TextInput value={itemobj.title} placeholder="Título da Anotação" onChangeText={(value) => changeText('title', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput value={itemobj.name} placeholder="Nome do País" onChangeText={(value) => changeText('name', value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput value={itemobj.description} placeholder="Descrição" onChangeText={(value) => changeText('description', value)}/>
        </View>
        <View>
            <Button color="#19AC52" title="Atualizar" onPress={() => alert('Datalhes')}/>
        </View>
        <View>
            <Button color="#E31030" title="Deletar" onPress={() => deleteItem()}/>
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
