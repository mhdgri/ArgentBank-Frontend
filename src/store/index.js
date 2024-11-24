import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const persistConfig = {
    key: "root",
    storage, // Utilise le stockage local pour persister l'état du store.
    whitelist: ["auth"], // Ne persiste que la slice `auth` du store.
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Permet de charger l'état du store à partir du stockage local.
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false, // Désactive la vérification de sérialisation pour les actions non sérialisables.
        }),
});

const persistor = persistStore(store);

export { store, persistor };
