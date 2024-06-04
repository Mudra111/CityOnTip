let totaluserReq = [];
let tbody = document.getElementById("tbodyGetUserReq");

const getUserReq = async () => {
	let options1 = {
		method: "GET",
	};

	let p = await fetch(
		"http://localhost:3000/cityOnTip/admin/getUserRequests",
		options1
	);
	let response = await p.json();
	return response;
};

const mainFuncGetUserReq = async () => {
	// window.location.reload();

	let userReq = await getUserReq();

	console.log(userReq);

	totaluserReq = userReq.userRequest;

	console.log(totaluserReq);

	if (totaluserReq != null) {
		for (let i = 0; i < totaluserReq.length; i++) {
			if (
				totaluserReq[i].status == "approved" ||
				totaluserReq[i].status == "rejected"
			) {
				tbody.innerHTML +=
					' <tr id="' +
					totaluserReq[i]._id +
					'"><td scope="row" id="name">' +
					totaluserReq[i].name +
					'</td><td id="email">' +
					totaluserReq[i].email +
					'</td><td id="password">' +
					totaluserReq[i].password +
					'</td><td id="role">' +
					totaluserReq[i].role +
					'</td><td id="status">' +
					totaluserReq[i].status +
					'</td><td><button type="button" class="btn btn-primary" disabled>' +
					"Approve" +
					'</button></td><td><button type="button" class="btn btn-primary" disabled>' +
					"Reject" +
					"</button></td></tr>";
			} else {
				tbody.innerHTML +=
					' <tr id="' +
					totaluserReq[i]._id +
					'"><td scope="row" id="name">' +
					totaluserReq[i].name +
					'</td><td id="email">' +
					totaluserReq[i].email +
					'</td><td id="password">' +
					totaluserReq[i].password +
					'</td><td id="role">' +
					totaluserReq[i].role +
					'</td><td id="status">' +
					totaluserReq[i].status +
					'</td><td><button type="button" id="' +
					totaluserReq[i]._id +
					'approveBTN" class="btn btn-primary">' +
					"Approve" +
					'</button></td><td><button type="button" id="' +
					totaluserReq[i]._id +
					'rejectBTN" class="btn btn-primary">' +
					"Reject" +
					"</button></td></tr>";
			}
		}

		for (let i = 0; i < totaluserReq.length; i++) {
			console.log(document.getElementById(totaluserReq[i]._id + "approveBTN"));
			let approveButton = document.getElementById(
				totaluserReq[i]._id + "approveBTN"
			);
			if (approveButton) {
				approveButton.addEventListener("click", async function (e) {
					e.preventDefault();

					let tr = document.getElementById(`${totaluserReq[i]._id}`);
					console.log(tr);
					let cells = tr.getElementsByTagName("td");

					// Accessing data cells by index
					let name = cells[0].textContent; // Assuming name cell is the first <td> element
					let email = cells[1].textContent;
					let pass = cells[2].textContent;
					let role = cells[3].textContent;

					console.log(email);
					console.log(pass);
					console.log(name);
					console.log(role);

					const data = {
						name: name,
						email: email,
						password: pass,
						role: role,
					};

					console.log(JSON.stringify(data));

					let options1 = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					};

					// console.log(email.value);
					// let options = {
					// 	method: "POST",
					// 	body: JSON.stringify(data),
					// };

					let p = await fetch(
						"http://localhost:3000/cityOnTip/admin/register",
						options1
					);
					let response = await p.json();
					// return response;
					// console.log("user registerd...");
					console.log(response);
					if (response.success) {
						alert(response.msg);
						window.location.reload();
					} else {
						alert(response.msg);
					}
				});
			}
		}

		for (let i = 0; i < totaluserReq.length; i++) {
			console.log(document.getElementById(totaluserReq[i]._id + "rejectBTN"));
			let rejectButton = document.getElementById(
				totaluserReq[i]._id + "rejectBTN"
			);
			if (rejectButton) {
				rejectButton.addEventListener("click", async function (e) {
					e.preventDefault();

					let tr = document.getElementById(`${totaluserReq[i]._id}`);
					console.log(tr);
					let cells = tr.getElementsByTagName("td");

					// Accessing data cells by index
					let name = cells[0].textContent; // Assuming name cell is the first <td> element
					let email = cells[1].textContent;
					let pass = cells[2].textContent;
					let role = cells[3].textContent;

					console.log(email);
					console.log(pass);
					console.log(name);
					console.log(role);

					const data = {
						name: name,
						email: email,
						password: pass,
						role: role,
					};

					console.log(JSON.stringify(data));

					let options1 = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					};

					// console.log(email.value);
					// let options = {
					// 	method: "POST",
					// 	body: JSON.stringify(data),
					// };

					let p = await fetch(
						"http://localhost:3000/cityOnTip/admin/reject",
						options1
					);
					let response = await p.json();
					// return response;
					// console.log("user registerd...");
					console.log(response);
					if (response.success) {
						alert(response.msg);
						window.location.reload();
					} else {
						alert(response.msg);
					}
				});
			}
		}
	}
};
