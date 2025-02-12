import styles from "./Card.module.scss";
import { useState } from "react";

function Card({
	title,
	price,
	srcImg,
	id,
	favorited,
	added = false,
	onAddToDrawer,
	onToggleFavorite,
}) {	
	const [isFavorite, setIsFavorite] = useState(favorited);

	const addProduct = () => {
		onAddToDrawer({ title, price, srcImg, id });
	};

	const toggleFavorite = () => {
		setIsFavorite((prev) => !prev);
		onToggleFavorite({ title, price, srcImg, id });
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				{onToggleFavorite && <img
					width={32}
					height={32}
					src={
						isFavorite
							? "/img/icons/favorite-like.svg"
							: "/img/icons/favorite-unlike.svg"
					}
					alt="liked"
					onClick={toggleFavorite}
				/>}
			</div>
			<img width="100%" height={130} src={srcImg} alt="" />
			<h5>{title}</h5>
			<div className={styles.buySneaker}>
				<div className={price}>
					<span>Цена: </span>
					<b>{price}</b>
				</div>
				{onAddToDrawer && <img
					className={styles.btnPlus}
					src={
						added ? "/img/icons/added.svg" : "/img/icons/plus.svg"
					}
					alt=""
					width={32}
					height={32}
					onClick={addProduct}
				/>}
			</div>
		</div>
	);
}

export default Card
