import { useContext } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router";
import StoreContext from "../../context";

function Header({ onOpenDrawer }) {
	const { cartItems } = useContext(StoreContext);

	return (
		<header>
			<Link to="/">
				<div className={styles.headerLeft}>
					<img width={40} height={40} src="img/icons/logo.png" />
					<div className={styles.headerInfo}>
						<h3>React Sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className={styles.headerRight}>
				<li onClick={onOpenDrawer}>
					<img width={18} height={18} src="img/icons/card.svg" />
					<span>
						{cartItems.length == 0
							? "Пусто"
							: cartItems.reduce((a, b) => b.price + a, 0) + ' руб.'}
					</span>
				</li>
				<li>
					<Link to="/favorites">
						<img src="img/icons/heart.svg" alt="" />
						<span>Закладки</span>
					</Link>
				</li>
				<li>
					<Link to='/orders'>
						<img width={18} height={18} src="img/icons/user.svg" />
						<span>Профиль</span>
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
