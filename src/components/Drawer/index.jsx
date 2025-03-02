import styles from "./Drawer.module.scss";
import Info from "../Info/Info";
import { useContext, useState } from "react";
import StoreContext from "../../context";
import axios from "axios";

function Drawer({ onClose, items, onRemove, totalPrice, isDrawerOpened }) {
	const { setCartItems } = useContext(StoreContext);
	const [isOrderReady, setIsOrderReady] = useState(false);
	const [idOrder, setIdOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const postOrder = async () => {
		function getDateOrder() {
			let date = new Date();
			let result = "";
			let optionsDate = {
				year: "numeric",
				month: "long",
				day: "numeric",
				timezone: "UTC",
			};

			let optionsTime = {
				timezone: "UTC",
				hour: "numeric",
				minute: "numeric",
			};

			result +=
				date.toLocaleString("ru", optionsDate).slice(0, -3) + ", ";
			result += date.toLocaleString("ru", optionsTime);
			return result;
		}

		try {
			setIsLoading(true);
			await axios
				.post("https://27c79fb4b290b182.mokky.dev/orders", {
					items: items,
					date: getDateOrder(),
					orderPrice: totalPrice,
				})
				.then((res) => setIdOrder(res.data.id));
			axios.patch("https://27c79fb4b290b182.mokky.dev/drawer/", []);
			await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();
			setCartItems([]);
		} catch (error) {
			console.log(error);
			console.log("Не удалось создать заказ");
		} finally {
			setIsLoading(false);
		}
	};

	const closeDrawer = (event) => {
		if (event.target.closest(`.${styles.drawer}`)) return;
		onClose();
	};

	return (
		<div
			className={`${styles.overlay} ${
				isDrawerOpened ? styles.overlayVisible : ""
			}`}
			onClick={closeDrawer}
		>
			<div className={styles.drawer}>
				<h2>
					Корзина
					<img
						className={styles.btnRemove}
						width={32}
						height={32}
						src="img/icons/remove.svg"
						alt=""
						onClick={onClose}
					/>
				</h2>

				{items.length > 0 ? (
					<>
						<div className={styles.items}>
							{items.map((item) => (
								<div key={item.id} className={styles.sneaker}>
									<img
										width={70}
										height={70}
										src={item.srcImg}
										alt=""
									/>
									<div className={styles.price}>
										<p>{item.title}</p>
										<b>{item.price} руб.</b>
									</div>
									<img
										className={styles.btnRemove}
										width={32}
										height={32}
										src="img/icons/remove.svg"
										alt=""
										onClick={() => onRemove(item.cartID)}
									/>
								</div>
							))}
						</div>

						<div className={styles.finalPrice}>
							<ul className={styles.totalBlock}>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{Math.round(totalPrice * 0.05)} руб.</b>
								</li>
							</ul>
						</div>

						<button
							disabled={isLoading}
							onClick={() => {
								postOrder();
								setIsOrderReady(true);
							}}
							className={styles.greenBtn + " greenBtn"}
						>
							<span>Оформить заказ</span>
							<img src="img/icons/arrow-right.svg" alt="" />
						</button>
					</>
				) : (
					<Info
						title={
							isOrderReady ? "Заказ оформлен" : "Корзина пуста"
						}
						img={
							isOrderReady
								? "img/icons/order-ready.png"
								: "img/icons/basket.png"
						}
						description={
							isOrderReady
								? `Ваш заказ #${idOrder} скоро будет передан курьерской доставке`
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
						}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
