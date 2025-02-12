import { useContext } from "react";
import Card from "../components/Card";
import StoreContext from "../context";

function Favorites() {
	const {favorites, onAddToDrawer, onToggleFavorite, cartItems} = useContext(StoreContext)
	
	return (
		<div className="content">
			<div className="titleSearch">
				<h1>Избранное</h1>
			</div>
			<div className="cards">
				{favorites.map((item) => (
					<Card
						key={item.favoriteID}
						id={item.id}
						title={item.title}
						price={item.price}
						srcImg={item.srcImg}
						favoriteID={item.favoriteID}
						onAddToDrawer={onAddToDrawer}
						onToggleFavorite={onToggleFavorite}
						favorited={true}
						added={cartItems.some(
							(elem) => item.id == elem.id
						)}
					/>
				))}
			</div>
		</div>
	);
}

export default Favorites;
