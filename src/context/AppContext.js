import React, { useEffect, useReducer, useState } from "react";
import firebase from "../firebase/index";
import {  toast } from 'react-toastify';

const AppContext = React.createContext();
const notify = (str, id) => toast(str, {containerId: id});
const cardReducer = (state, action) => {
  switch (action.type) {
    case "delete_card":
      return state.filter(card => card.id !== action.payload);
    case "add_card":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
          image: action.payload.image,
          description: action.payload.description
        }
      ];
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [cardList, dispatch] = useReducer(cardReducer, []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [goodsFromFB, setGoodsFromFb] = useState([]);
  const [listOfProducts, setListOfProducts] = useState("");
  const addCard = (title, content, image) => {
    dispatch({ type: "add_card", payload: { title, content, image } });
  };
  const deleteCard = id => {
    dispatch({ type: "delete_card", payload: id });
  };

  const onChange = e => {
    e.preventDefault();
    try {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setImageValue(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.log(e.message);
    } finally {
      setImageValue("");
    }
  };

  const makeListOfProducts = async (title, content, image, description) => {
    if (goodsFromFB === null) {
      setListOfProducts(prevState => [
        ...prevState,
        {
          id: Math.floor(Math.random() * 9999),
          title,
          content,
          image,
          description
        }
      ]);
    } else {
      setListOfProducts([
        ...goodsFromFB,
        ...cardList,
        {
          id: Math.floor(Math.random() * 9999),
          title,
          content,
          image,
          description
        }
      ]);
    }
  };
  const uploadToTheFireBase = async () => {
    if (listOfProducts) {
      await firebase
        .database()
        .ref("products")
        .child("item")
        .update(listOfProducts)
        .then(setListOfProducts(""));
    } else {
      notify("Добавьте карту", "addCard");
    }
  };

  const getDataFromFireBase = async () => {
    if (goodsFromFB !== null) {
      await firebase
        .database()
        .ref("products")
        .child("item")
        .once("value")
        .then(function(snapshot) {
          if (snapshot.val() !== null) {
            setGoodsFromFb(Object.values(snapshot.val()));
          }
        });
    }
  };

  const addPreparedCard = () => {
    if ((title, content, imageValue, description)) {
      addCard(title, content, imageValue, description);
      makeListOfProducts(title, content, imageValue, description);
    } else notify("Заполните все поля", "fillAllFields");
  };

  const removeProductFromFirebase = async id => {
    const removeArr = goodsFromFB.filter(item => item.id !== id);
    await firebase
      .database()
      .ref("products")
      .child("item")
      .set(removeArr)
      .then(setGoodsFromFb(removeArr));
  };

  const removePreparedCard = id => {
    deleteCard(id);
    removeProductFromFirebase(id);
  };
  useEffect(() => {
    getDataFromFireBase();
  }, []);
  useEffect(() => {
    return () => setImageValue("");
  }, []);
  useEffect(() => {
    console.log("goodsFromFB changed");
  }, [goodsFromFB, cardList]);

  return (
    <AppContext.Provider
      value={{
        data: cardList,
        removePreparedCard,
        makeListOfProducts,
        onChange,
        uploadToTheFireBase,
        addPreparedCard,
        removeProductFromFirebase,
        imageValue,
        goodsFromFB,
        title,
        setTitle,
        content,
        setContent,
        description,
        setDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export { AppProvider };
