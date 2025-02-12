import "./App.scss";
import axios from "axios";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import StoreContext from "./context";
import Orders from "./pages/Orders";

// Стилизовать страницу заказов
// На странице заказов можно реализовать Скелеты при загрзуке
// На странице заказов можно сделать ленивую загрузку товаров, чтобы они подгружались при скролле вниз, а не все сразу

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [isDrawerOpened, setIsDrawerOpened] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const onAddToDrawer = (obj) => {
		try {
			let cartID = cartItems.find((elem) => elem.id == obj.id)?.cartID;

			if (cartID) {
				setCartItems((prev) =>
					prev.filter((item) => item.id != obj.id)
				);
				axios.delete(
					`https://27c79fb4b290b182.mokky.dev/drawer/${cartID}`
				);
			} else {
				setCartItems((prev) => [...prev, { ...obj, cartID: null }]);
				axios
					.post("https://27c79fb4b290b182.mokky.dev/drawer", obj)
					.then((res) => {
						setCartItems((prev) =>
							prev.map((elem) =>
								obj.id == elem.id
									? { ...elem, cartID: res.data.cartID }
									: elem
							)
						);
					});
			}
		} catch (error) {
			console.log(error);
			console.log("Ошибка при добавлении в корзину");
			setCartItems((prev) => prev.filter((elem) => elem.id != obj.id));
		}
	};

	const onRemoveItemDrawer = (id) => {
		try {
			axios.delete(`https://27c79fb4b290b182.mokky.dev/drawer/${id}`);
			setCartItems((prev) => prev.filter((item) => item.cartID != id));
		} catch (error) {
			console.log("Ошибка удаления товара");
			console.log(error);
		}
	};

	const onToggleFavorite = (obj) => {
		try {
			let favoriteID = favorites.find(
				(elem) => elem.id == obj.id
			)?.favoriteID;
			if (favoriteID)
				axios
					.delete(
						`https://27c79fb4b290b182.mokky.dev/favorites/${favoriteID}`
					)
					.then((res) =>
						setFavorites((prev) =>
							prev.filter((elem) => elem.id != obj.id)
						)
					);
			else
				axios
					.post("https://27c79fb4b290b182.mokky.dev/favorites", obj)
					.then((res) => {
						setFavorites((prev) => [...prev, res.data]);
						items.find(
							(elem) => res.data.id == elem.id
						).favoriteID = res.data.favoriteID;
					});
		} catch (error) {
			console.log("Ошибка при добавлении в избранное");
		}
	};

	useEffect(() => {
		try {
			async function fetchData() {
				const [itemRes, cartItemRes, favoritesRes] = await Promise.all([
					axios.get("https://27c79fb4b290b182.mokky.dev/items"),
					axios.get("https://27c79fb4b290b182.mokky.dev/drawer"),
					axios.get("https://27c79fb4b290b182.mokky.dev/favorites"),
				]);
				setCartItems(cartItemRes.data);
				setFavorites(favoritesRes.data);
				setItems(itemRes.data);
				setIsLoading(false);
			}
			fetchData();
		} catch (error) {
			console.log("Ошибка загрузки");
			console.log(error);
		}
	}, []);

	return (
		<StoreContext
			value={{
				items,
				cartItems,
				favorites,
				onToggleFavorite,
				onAddToDrawer,
				setIsDrawerOpened,
				setCartItems,
			}}
		>
			<div className="wrapper">
				<Drawer
					items={cartItems}
					onClose={() => setIsDrawerOpened((prev) => !prev)}
					isDrawerOpened={isDrawerOpened}
					onRemove={onRemoveItemDrawer}
					totalPrice={cartItems.reduce(
						(acc, item) => acc + item.price,
						0
					)}
				/>
				<Header
					onOpenDrawer={() => setIsDrawerOpened((prev) => !prev)}
				/>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								// items={items}
								// cartItems={cartItems}
								// favorites={favorites}
								// onAddToDrawer={onAddToDrawer}
								// onToggleFavorite={onToggleFavorite}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</div>
		</StoreContext>
	);
}

export default App;
