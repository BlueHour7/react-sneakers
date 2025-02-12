import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

function Orders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		try {
			axios
			.get("https://27c79fb4b290b182.mokky.dev/orders")
			.then((res) => setOrders(res.data));
		}
		catch (error){
			console.log('Ошибка при получении заказов');
			console.log(error);
		}
	}, []);

	return (
		<div className="content">
			<div className="titleSearch">
				<h1>Мои заказы</h1>
			</div>
			<div>
				{orders.map((order) => (
					<div key={order.id}>
						<h3>{`Заказ #${order.id} от ${order.date}`}</h3>
						<p>{`Сумма: ${order.orderPrice} руб.`}</p>
						<div className="cards">
							{order.items.map((item) => (
								<Card
									key={item.id}
									id={item.id}
									title={item.title}
									price={item.price}
									srcImg={item.srcImg}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Orders;
