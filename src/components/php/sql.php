<?php
require_once "db.php";

function executeQuery($sql, $data) {
	global $conn;
	$smt = $conn->prepare($sql);
	$values = array_values($data);
	$types = str_repeat("s", count($values));
	$smt->bind_param($types, ...$values);
	$smt->execute();
	return $smt;
}
function create($table, $data) {
	global $conn;
	$sql = "INSERT INTO $table SET ";
	$i = 0;
	foreach ($data as $key => $value) {
		if ($i === 0) {
			$sql = $sql . "$key=?";
		} else {
			$sql = $sql . ", $key=?";
		}
		$i++;
	}
	$smt = executeQuery($sql, $data);
	$id = $smt->insert_id;
	return $id;
}
function selectOne($table, $conditions) {
    global $conn;
    $sql = "SELECT * FROM $table";
        $i = 0;
        foreach($conditions as $key => $value) {
            if ($i === 0) {
               $sql = $sql . " WHERE $key=?";
            } else {
               $sql = $sql . " AND $key=?";
            }
            $i++;
        }
        $sql = $sql . " LIMIT 1";
        $smt = executeQuery($sql, $conditions);
        $records = $smt->get_result()->fetch_assoc();
        return $records;
}
function update($table, $id, $data) {
    global $conn;
    $sql = "UPDATE $table SET ";
    $i = 0;
    foreach($data as $k => $v) {
        if ($i === 0) {
            $sql = $sql . "$k=?";
        } else {
            $sql = $sql . ",$k=?";
        }
        $i++;
    }
    $sql = $sql . " WHERE id=?";
    $data['id'] = $id;
    $smt = executeQuery($sql, $data);
    return $smt->error;
}
function selectAll($table, $conditions = []) {
    global $conn;
         $sql = "SELECT * FROM $table";
    if (empty($conditions)) {
         $smt = $conn->prepare($sql);
         $smt->execute();
         $records = $smt->get_result()->fetch_all(MYSQLI_ASSOC);
         return($records);
     } else {
        $i = 0;
        foreach($conditions as $key => $value) {
            if ($i === 0) {
            $sql = $sql . " WHERE $key=?";
            } else {
            $sql = $sql . " AND $key=?";
            }
            $i++;
        }
        $smt = executeQuery($sql, $conditions);
        $records = $smt->get_result()->fetch_all(MYSQLI_ASSOC);
        return($records);
    }
}
function deleteCart($token) {
    global $conn;
    $sql = "DELETE FROM cart WHERE cart_tok=?";
    $smt = executeQuery($sql, ["cart_tok" => $token]);
    return $smt->affected_rows;
}
function delete($table, $id) {
    global $conn;
    $sql = "DELETE FROM $table  WHERE id=?";
    $smt = executeQuery($sql, ['id' => $id]);
    return $smt->affected_rows;
}
function CARTS($tok)
{
    global $conn;
    $sql = "SELECT c.* FROM cart AS c join products as p on c.p_tok=p.p_tok WHERE c.cart_tok=?";
    $smt = executeQuery($sql, ['cart_tok' => $tok]);
    $records = $smt->get_result()->fetch_assoc();
    return $records;
}

