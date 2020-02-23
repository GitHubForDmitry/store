import React, {useReducer, useState} from 'react';
import firebase from "../firebase/index";


const AppContext = React.createContext();

const cardReducer = (state, action) => {
    switch (action.type) {
        case 'delete_card':
            return state.filter((card)=> card.id !== action.payload)
        case 'add_card':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 9999),
                    title: action.payload.title,
                    content: action.payload.content,
                    image: action.payload.image,
                }
            ];
        default: return state;
    }
}

const AppProvider = ({ children }) => {
    const [cardList, dispatch] = useReducer(cardReducer, []);

    const addCard = (title, content, image) => {
            dispatch({type: "add_card", payload: {title, content, image}})
    };

    const deleteCard = (id) => {
            dispatch({type: "delete_card", payload: id})
    }
    const [imageValue,setImageValue] = useState('')
    const onChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImageValue(reader.result)
        }

        reader.readAsDataURL(file)
    };
    const [image, setImage] = useState('')
    const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1
        // });
        // if (!result.cancelled) {
        //     setImage(result.uri);
        firebase
            .database()
            .ref("users/comments/")
            .set({test: "test"})
            // .then(setReview(""));
    };

    return (
        <AppContext.Provider
            value={{
                data: cardList,
                addCard,
                deleteCard,
                imageValue,
                onChange
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;

export { AppProvider };