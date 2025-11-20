import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("product_1v").select();
      if (error) setError(error.message);
      else setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (session) {
      async function fetchCart() {
        const { data, error } = await supabase
          .from("cart")
          .select("*, product_1v(*)") 
          .eq("user_id", session.user.id); 

        if (error) {
          console.error("Erro ao buscar carrinho:", error);
          return;
        }

        const formattedCart = data.map((item) => ({
          ...item.product_1v, 
          cart_id: item.id,   
          quantity: item.quantity
        }));

        setCart(formattedCart);
      }
      fetchCart();
    } else {
      const storedCart = localStorage.getItem("myCart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, [session]);

  const updateLocalStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem("myCart", JSON.stringify(newCart));
  };


  async function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (session) {
      const { user } = session;
      
      if (existingItem) {
        const newQty = existingItem.quantity + 1;
        await updateQtyCart(product.id, newQty); 
      } else {
        const { data, error } = await supabase
            .from("cart")
            .insert({
                user_id: user.id,
                product_id: product.id,
                quantity: 1
            })
            .select(); 

        if(!error && data) {
            const newCartItem = { ...product, quantity: 1, cart_id: data[0].id };
            setCart(prev => [...prev, newCartItem]);
        }
      }
    } else {
      let newCart;
      if (existingItem) {
        newCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...cart, { ...product, quantity: 1 }];
      }
      updateLocalStorage(newCart);
    }
  }

  async function updateQtyCart(productId, newQuantity) {
    if (newQuantity < 1) return; 

    if (session) {
        const item = cart.find(i => i.id === productId);
        
        if (item && item.cart_id) {
            setCart(prev => prev.map(i => i.id === productId ? {...i, quantity: newQuantity} : i));

            const { error } = await supabase
                .from("cart")
                .update({ quantity: newQuantity })
                .eq("id", item.cart_id); 

            if (error) {
                console.error("Erro ao atualizar quantidade:", error);
            }
        }
    } else {
        const newCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        updateLocalStorage(newCart);
    }
  }

  async function removeFromCart(productId) {
    if(session) {
        const item = cart.find(i => i.id === productId);
        if(item?.cart_id) {
            setCart(prev => prev.filter(i => i.id !== productId));
            await supabase.from("cart").delete().eq("id", item.cart_id);
        }
    } else {
        const newCart = cart.filter((item) => item.id !== productId);
        updateLocalStorage(newCart);
    }
  }

  function clearCart() {
    setCart([]);
    if(!session) {
        localStorage.removeItem("myCart");
    } else {

    }
  }

  return (
    <CartContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, updateQtyCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}
















/*import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  // Context to manage the products state
  products: [],
  loading: false,
  error: null,
  // Context to manage the cart state
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  // Context to manage user session
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product").select();
      if (error) {
        setError(`Fetching products failed! ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();
    // State to manage products API
    // var category = "smartphones";
    // var limit = 10;
    // var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    // async function fetchProducts() {
    //   try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchProducts();
  }, []);

  // State to manage the cart
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  // User Session Management
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      if (data.user) {
        setSessionMessage(
          "Registration successful! Check your email to confirm your account."
        );
        window.location.href = "/signin";
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if(data.session){
        setSession(data.session);
        setSessionMessage("Sign in successful!");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      window.location.href = "/";
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    // Context to manage user session
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}*/









/*import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
    products: [],
    loading: false,
    error: null,

    cart: [],
    addToCart: () => {},
    updateQtyCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},

    session: null,
    sessionLoading: false,
    sessionMessage: null,
    sessionError: null,
    handleSignUp: () => {},
    handleSignIn: () => {},
    handleSignOut: () => {},
});

export function CartProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProductsSupabase() {
            const { data, error } = await supabase.from('products').select();
            if (error) {
                setError(`Fetching products failed! ${error.message}`);
            } else {
                setProducts(data);
            }
            setLoading(false);
        }
        fetchProductsSupabase();
        
        /*async function fetchProducts() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();/
    }, []);

    const [cart, setCart] = useState([]);

    function addToCart(product) {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            updateQuantity(product.id, existingProduct.quantity + 1);
        } else {
            setCart((prevCart) => [...prevCart, {...product, quantity: 1 }]);
        }
    }

    function removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    function updateQtyCart(productId, quantity) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
            )
        );
    }

    function clearCart() {
        setCart([]);
    }

    //User Session Management
    const [session, setSession] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(false);
    const [sessionMessage, setSessionMessage] = useState(null);
    const [sessionError, setSessionError] = useState(null);

    async function handleSignUp(email, password, username) {
        setSessionLoading(true);
        setSessionMessage(null);
        setSessionError(null);
        
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                        admin: false,
                    },
                    emailRedirectTo: `${window.location.origin}/signin`,
                },
            });

            if (error) throw error;

            if (data.user) {
                setSessionMessage("Cadastro realizado! Verifique seu email para confirmar sua conta.");
            };
            window.location.href = "/signin";

        } catch (error) {
            setSessionError(error.message);
        } finally {
            setSessionLoading(false);
        }
    }

    async function handleSignIn(email, password) {
        setSessionLoading(true);
        setSessionMessage(null);
        setSessionError(null);
        
        try {
            const {data, error} = await supabase.auth.signIn({
                email,
                password
            });

            if (error) throw error;

            if (data.session) {
                setSession(data.session);
                setSessionMessage("Login realizado com sucesso!");
            }

        } catch (error) {
            setSessionError(error.message);
        } finally {
            setSessionLoading(false);
        }
    }

    async function handleSignOut() {
        setSessionLoading(true);
        setSessionMessage(null);
        setSessionError(null);
        
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setSession(null);
            window.location.href = "/";
        } catch (error) {
            setSessionError(error.message);
        } finally {
            setSessionLoading(false);
        }
    }

    const context = {
        products: products,
        loading: loading,
        error: error,
        cart: cart,
        addToCart: addToCart,
        updateQtyCart: updateQtyCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,

        session: session,
        sessionLoading: sessionLoading,
        sessionMessage: sessionMessage,
        sessionError: sessionError,
        handleSignUp: handleSignUp,
        handleSignIn: handleSignIn,
        handleSignOut: handleSignOut,
    };

    return (
        <CartContext.Provider value={context}>{children}</CartContext.Provider>
    )
} */  