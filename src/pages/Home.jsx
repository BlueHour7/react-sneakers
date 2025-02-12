import Card from "../components/Card";
import styles from "../components/Card/Card.module.scss";
import ContentLoader from "react-content-loader";
import StoreContext from "../context";
import { useContext } from "react";

const SkeletCard = () => {
	return (
		<div className={styles.card}>
			<ContentLoader
				speed={2}
				width="100%"
				height="100%"
				viewBox="0 0 155 264"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="127" y="80" rx="0" ry="0" width="0" height="1" />
				<rect x="0" y="172" rx="5" ry="5" width="155" height="16" />
				<rect x="0" y="192" rx="5" ry="5" width="100" height="16" />
				<rect x="0" y="232" rx="5" ry="5" width="84" height="23" />
				<rect x="117" y="226" rx="10" ry="10" width="36" height="36" />
				<rect x="0" y="20" rx="10" ry="10" width="100%" height="122" />
			</ContentLoader>
		</div>
	);
};

function Home({
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	isLoading,
	// onAddToDrawer,
	// onToggleFavorite,
	// items,
	// cartItems,
	// favorites,
}) {
	const {items, cartItems, favorites, onAddToDrawer, onToggleFavorite} = useContext(StoreContext)

	return (
		<div className="content">
			<div className="titleSearch">
				<h1>
					{searchValue
						? `Поиску по запросу: "${searchValue}"`
						: "Все кроссовки"}
				</h1>
				<div className="search">
					<img src="/img/icons/loupe.svg" alt="" />
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder="Поиск..."
					/>
					{searchValue && (
						<img
							className="clearSearch"
							width={20}
							height={20}
							src="/img/icons/remove.svg"
							alt=""
							onClick={() => setSearchValue("")}
						/>
					)}
				</div>
			</div>
			<div className="cards">
				{isLoading
					? Array(8)
							.fill(true)
							.map((elem, ind) => <SkeletCard key={ind} />)
					: items
							.filter((item) =>
								item.title
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							)
							.map((item) => (
								<Card
									key={item.id}
									id={item.id}
									title={item.title}
									price={item.price}
									srcImg={item.srcImg}
									onAddToDrawer={onAddToDrawer}
									onToggleFavorite={onToggleFavorite}
									added={cartItems.some(
										(elem) => item.id == elem.id
									)}
									favorited={favorites.some(
										(elem) => item.id == elem.id
									)}
								/>
							))}
			</div>
		</div>
	);
}

export default Home;
