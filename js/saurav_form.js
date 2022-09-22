function localStorage_setitem(list) {
	localStorage.setItem("Product", JSON.stringify(list));
}

function localStorage_getitem() {
	if (localStorage.getItem("Product") == null) {
		var list = [];
		var pId = 1;
	} else {
		var list = JSON.parse(localStorage.getItem("Product"));
		var pId = list[list.length - 1].prod_id + 1;
	}
	return [list, pId];
}

function check(inputValue, validationId, errorType) {
	inputValue = inputValue.trim();

	if (inputValue != "") {
		document.getElementById(validationId).innerHTML = "";
	} else {
		document.getElementById(validationId).innerHTML =
			"Please Enter " + errorType + ".";
	}
}

function deleteData() {
	var deleteElement = document.getElementById("deleteId");
	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("deleteForm").reset();
	} else if (deleteElement.value == "") {
		document.getElementById("validateDeleteId").innerHTML =
			"Please Enter Product Id";
		deleteElement.focus();
	} else {
		var deleteFlag = -1;
		for (var data of productData) {
			if (data.productId == deleteElement.value) {
				deleteFlag = data;
				break;
			}
		}
		if (deleteFlag == -1) {
			alert("Invalid Product Id !!!");
		} else {
			productData.splice(data.productId - 1, 1);
			localStorage_setitem(productData);
			alert("Product Data deleted Successfully !");
			view();
		}
	}
}

function update() {
	var updateProdId = document.getElementById("updateId");
	var updateOldName = document.getElementById("updateOldName");
	var updateNewName = document.getElementById("updateNewName");

	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("updateForm").reset();
	} else if (updateProdId.value == "") {
		document.getElementById("validateUpdateId").innerHTML =
			"Please Enter Product Id";
		updateProdId.focus();
	} else if (updateOldName.value == "") {
		document.getElementById("validateUpdateOldName").innerHTML =
			"Please Enter Old Name";
		updateOldName.focus();
	} else if (updateNewName.value == "") {
		document.getElementById("validateUpdateNewName").innerHTML =
			"Please Enter New Name";
		updateNewName.focus();
	} else {
		var updateFlag = -1;

		for (var data of productData) {
			if (data.productId == updateProdId.value) {
				updateFlag = 1;
				if (data.productName == updateOldName.value) {
					updateFlag = data;
					break;
				}
			}
		}
		if (updateFlag == -1) {
			alert("Invalid Product Id !!!");
			document.getElementById("updateForm").reset();
		} else if (updateFlag == 1) {
			alert("Invalid Product Name !!!");
			document.getElementById("updateForm").reset();
		} else {
			data.productName = updateNewName.value;
			localStorage_setitem(productData);
			alert("Product Data updated Successfully !");
			view();
		}
	}
}

function search() {
	var searchElement = document.getElementById("searchId");
	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("searchForm").reset();
	} else if (searchElement.value == "") {
		document.getElementById("validateProdId").innerHTML =
			"Please Enter Product Id";
		searchElement.focus();
	} else {
		var searchFlag = -1;

		for (var data of productData) {
			if (data.productId == searchElement.value) {
				searchFlag = data;
				break;
			}
		}
		if (searchFlag == -1) {
			alert("Invalid Product Id !!!");
			document.getElementById("searchForm").reset();
		} else {
			var content =
				"<tr><th>Prod Id</th><th>Product Name</th><th>Product Price</th></tr>";

			content +=
				"<tr><td>" +
				searchFlag.productId +
				"</td><td>" +
				searchFlag.productName +
				"</td><td>" +
				searchFlag.productPrice +
				"</td></tr>";

			content = document.getElementById("productTable").innerHTML = content;
		}
	}
}

function view() {
	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("productTable").innerHTML = "";
	} else {
		var content =
			"<tr><th>Prod Id</th><th>Product Name</th><th>Product Price</th></tr>";

		for (var data of productData) {
			content +=
				"<tr><td>" +
				data.productId +
				"</td><td>" +
				data.productName +
				"</td><td>" +
				data.productPrice +
				"</td></tr>";
		}

		document.getElementById("productTable").innerHTML = content;
	}
}

function insert() {
	var prodName = document.getElementById("productName");
	var prodPrice = document.getElementById("productPrice");

	if (prodName.value == "") {
		document.getElementById("validateProdName").innerHTML =
			"Please Enter Product Name";
		prodName.focus();
	} else if (prodPrice.value == "") {
		document.getElementById("validateProdPrice").innerHTML =
			"Please Enter Product Price";
		prodPrice.focus();
	} else {
		var dummy = {
			productId: pId++,
			productName: prodName.value,
			productPrice: prodPrice.value,
		};
		productData.push(dummy);
		localStorage_setitem(productData);
		document.getElementById("product").reset();
		alert("Product Data inserted Successfully !");
	}
}

var productData = localStorage_getitem()[0];
var pId = localStorage_getitem()[1];
