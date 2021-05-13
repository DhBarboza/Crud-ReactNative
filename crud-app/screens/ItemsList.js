import React, { useEffect, useState} from 'react'
import { Text, View } from 'react-native';
import firebase from '../database/firebase';


const ItemsList = () => {

    const [items, setState] = useState([])

    useEffect(() => {
        firebase.db.collection('anotations').onSnapshot(querySnapshot => {

            // Lista de Items:
            const items = [];

            querySnapshot.docs.forEach(doc => {

                // Constante que recebe documentos:
                const { title, name, description} = doc.data()
                items.push({
                    id: doc.id,
                    title,
                    name,
                    description
                })
            })
        })
    }, [])

    return (
        <View>
            <Text>Lista de Items</Text>
        </View>
    )
}

export default ItemsList
