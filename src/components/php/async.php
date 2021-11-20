<?php
require 'sql.php';
require 'helpers/malware.php';
require 'class/product.php';
$product = new Product();
$product->async();