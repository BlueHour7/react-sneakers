import { useContext } from "react";
import styles from "./Info.module.scss";
import stylesGreenBtn from "../Drawer/Drawer.module.scss";
import StoreContext from "../../context";
import { Link } from "react-router";

function Info({ title, description, img }) {
	const { setIsDrawerOpened } = useContext(StoreContext);

	return (
		<div className={`${styles.drawerEmpty}`}>
			<img width={120} src={img} alt="" />
			<h3>{title}</h3>
			<p>{description}</p>
			<Link to='/'>
				<button
					onClick={() => setIsDrawerOpened((prev) => !prev)}
					className={`${styles.greenBtn} ${stylesGreenBtn.greenBtn} greenBtn`}
				>
					<img src="img/icons/arrow-left.svg" alt="" />К покупкам
				</button>
			</Link>
		</div>
	);
}

export default Info;
