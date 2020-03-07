import React, { useEffect, useReducer, useState } from "react";
import firebase from "../firebase/index";
import { toast } from "react-toastify";

const AppContext = React.createContext();
const notify = (str, id) => toast(str, { containerId: id });
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
    case "filter_card":
      return filterSize(action.payload, state)
  }
};
function filterSize(value, arr) {
  switch (value) {
    case 'checkedA':
      return [...arr].filter((item) => item.title === "1");
    case 'checkedB':
      return [...arr].filter((item) => item.content === '2');

    default:
      return [...arr];
  }
}
const AppProvider = ({ children }) => {
  const [cardList, dispatch] = useReducer(cardReducer, []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [goodsFromFB, setGoodsFromFb] = useState([]);
  const [listOfProducts, setListOfProducts] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [displayName, setDisplayName] = useState("");

  const addCard = (title, content, image, description) => {
    dispatch({
      type: "add_card",
      payload: { title, content, image, description }
    });
  };
  const deleteCard = id => {
    dispatch({ type: "delete_card", payload: id });
  };
  const filterCard = id => {
    dispatch({ type: "filter_card", payload: id });
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
    console.log(listOfProducts);
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
    } else notify("Заполните все поля и добавьте картинку", "fillAllFields");
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
  const signOut = async () => {
    await setUserImage("");
    await setDisplayName("");
    await firebase
      .auth()
      .signOut()
      .then((window.location.href = "/signIn"));
  };

  const removePreparedCard = id => {
    deleteCard(id);
    removeProductFromFirebase(id);
  };
  useEffect(() => {
    getDataFromFireBase();
  }, [goodsFromFB]);

  useEffect(() => {
    return () => setImageValue("");
  }, []);
  useEffect(() => {}, [cardList]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      if (user) {
        setUserImage(firebase.auth().currentUser.photoURL);
        setDisplayName(firebase.auth().currentUser.displayName);
      }
    });
  });
  useEffect(() => {}, [userImage]);

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const [filtered, setFiltered] = useState([]);
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    if(event.target.checked) {
      setFiltered( filterCard(name, goodsFromFB));
    }
  };

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
        signOut,
        handleChange,
        filterCard,
        filtered,
        imageValue,
        goodsFromFB,
        title,
        setTitle,
        content,
        setContent,
        description,
        setDescription,
        isSignedIn,
        userImage,
        displayName,
        state
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export { AppProvider };
