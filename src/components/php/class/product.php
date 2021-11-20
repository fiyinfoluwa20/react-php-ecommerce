<?php
class Product
{
	public function async()
	{
		$this->product();
		$this->addCart();
		$this->deleteCart();
		$this->single_product();
		$this->updateAllCart();
		$this->Quatity();
		$this->Changesize();
		$this->addFavorite();
		$this->deleteFavorite();
	}
    public function product()
	{
		if (isset($_GET['url']) && !empty($_GET['url'])) {
			Malware::jsonGet();
			if ($_GET["url"] != "index") exit;
			$products = selectAll("products", ['published' => 1, "authorised" => 1]);
			if(!$products) exit;
			foreach ($products as $key => $value) {
				$products[$key]["amount"] = number_format($value['amount']);
			}
			Malware::error($products, "s");
		}
	}

    public function single_product()
	{
		if (isset($_GET['product']) && !empty($_GET['product']) || isset($_GET['token'])  && !empty($_GET['token'])) {
			Malware::jsonGet();
			$products = selectOne("products", ['title' => trim($_GET['product']), "p_tok" => trim($_GET['token'])]);
			if(!$products) exit;
			$category = selectOne("categories", ['id' => $products["category_id"]]);
			$products["category"] = $category['name'];
			$products["body"] = $products['body'];
			$products["amount"] = number_format($products['amount']);
			$products["sizes"] = explode(",", $products['sizes']);
			Malware::error($products, "s");
		}
	}
	public function addCart()
	{
		if (isset($_POST['addCart'])) {
			Malware::jsonPost();
			$id = $_POST['addCart'];
			$size = $_POST['size'];
			$token = explode(',', $_POST['token']);
			$product_ids = explode(',', $_POST['id']);
			unset($_POST);
			$product = selectOne("products", ["id" => $id]);
			$_POST['product_id'] = $product['id'];
			$_POST['user_id'] = 1;
			$_POST['qty'] = 1;
			$_POST['p_tok'] = $product['p_tok'];
			$_POST['cart_tok'] = bin2hex(random_bytes(5));
			$_POST['category_id'] = $product['category_id'];
			$_POST['title'] = $product['title'];
			$_POST['sizes'] = $size;
			$_POST['allsizes'] = $product['sizes'];
			$_POST['product_badge'] = $product['product_badge'];
			$_POST['amount'] = $product['amount'];
			$_POST['total'] = $product['amount'];
			$_POST['image1'] = $product['image1'];
			$_POST['image2'] = $product['image2'];
			$_POST['image3'] = $product['image3'];
			$_POST['discount'] = $product['discount'];
			$carts = [];
			foreach ($token as $key => $value) {
				$carts[$key] = CARTS($value);
			}
			$column = array_column($carts, 'product_id', 'cart_tok');
			if (in_array($id, $column)) {
				Malware::error(["status" => "error", "product" => $product['title']], "s");
			} else {
				$create = create('cart', $_POST);
				$session = selectOne('cart', ['id' => $create]);
				$one = self::carts($session);
				$session['amount'] = number_format($session['amount']);
				$total = 0;
				$total += $session['total'] * $session['qty'];
				$session['total'] = number_format($session['total'] * $session['qty']);
				$session['discount'] = number_format($session['discount']);
				$session['allsizes'] = explode(",", $session['allsizes']);
				$totals = number_format($total > 0 ? $total + 1000 : 0);
				$total = number_format($total);
				$favorites = selectAll("wishlist", ['user_id' => 1]);
				Malware::error(["cart" => $one, "carts" => $session, "favorites" => $favorites, "status" => "success", "totals" => $totals, "total" => $total], "s");
			}
		}
	}
	private static function carts($c) {
		$i['id'] = $c['id'];
		$i['cartToken'] = $c['cart_tok'];
		$i['productId'] = $c['product_id'];
		return $i;
	}
	public function deleteCart()
	{
		if (isset($_POST['deleteCart'])) {
			Malware::jsonPost();
			$token = $_POST['deleteCart'];
			$status = deleteCart($token);
			if ($status) {
				Malware::error(["status" => "success"], "s");
			} else {
				Malware::error(["status" => "error"], "s");
			}
		}
	}
	public function updateAllCart()
	{
		if (isset($_POST['updateAllCart'])) {
			Malware::jsonPost();
			$carts = explode(',', $_POST['updateAllCart']);
			$cart = [];
			foreach ($carts as $key => $value) {
				$cart[$key] = CARTS($value);
			}
			$newCart = ["cart" => [], "carts" => [], "total" => 0];
			$total = 0;
			foreach ($cart as $key => $value) {
				if (!empty($cart[$key])) {
					$newCart["cart"][] = self::carts($value);
					$total += $value["total"];
					$newCart["total"] += $value['total'] * $value['qty'];
					$value["amount"] = number_format($value["amount"]);
					$value["discount"] = number_format($value["discount"]);
					$value['total'] = number_format($value['total'] * $value['qty']);
					$value['allsizes'] = explode(",", $value['allsizes']);
					$newCart["carts"][] = $value;
				}
			}
			$newCart["totals"] = number_format($newCart["total"] > 0 ? $newCart["total"] + 1000 : 0);
			$newCart["total"] = number_format($newCart['total']);
			$newCart["favorites"] = selectAll("wishlist", ['user_id' => 1]);
			Malware::error($newCart, "s");
		}
	}
	public function Quatity()
	{
		if (isset($_POST['quatity'])) {
			Malware::jsonPost();
			$id = $_POST['id'];
			$quatity = $_POST['quatity'];
			$update = update("cart", $id, ["qty" => $quatity]);
			Malware::error(["status" => "success"], "s");
		}
	}
	public function Changesize()
	{
		if (isset($_POST['changesize'])) {
			Malware::jsonPost();
			$id = $_POST['id'];
			$size = $_POST['changesize'];
			$update = update("cart", $id, ["sizes" => $size]);
			Malware::error(["status" => "success"], "s");
		}
	}
	public function addFavorite()
	{
		if (isset($_POST['addFavorite'])) {
			Malware::jsonPost();
			$id = $_POST['addFavorite'];
			$select = selectOne("products", ["id" => $id]);
			$post['product_id'] = $select['id'];
			$post['p_tok'] = $select['p_tok'];
			$post['user_id'] = 1;
			$post['wish_tok'] = bin2hex(random_bytes(7));
			$post['title'] = $select['title'];
			$post['amount'] = $select['amount'];
			$post['discount'] = $select['discount'];
			$post['image1'] = $select['image1'];
			$create = create("wishlist", $post);
			Malware::error(["status" => "success", "data" => selectOne("wishlist", ['id' => $create])], "s");
		}
	}
	public function deleteFavorite()
	{
		if (isset($_POST['deleteFavorite'])) {
			Malware::jsonPost();
			$id = $_POST['deleteFavorite'];
			delete("wishlist", $id);
			Malware::error(["status" => "success"], "s");
		}
	}


}