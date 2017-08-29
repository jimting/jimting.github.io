		var loginStatus = false;
		var userNumber;
		var indexPage = 1;
		var selectPage = 1;
		var selectGroup = null;//預設為不知道哪一組
		
		
		function getAllData()
		{	
			document.getElementById("userData").innerHTML = '<img src="http://140.121.177.100/ntoustu/dataControl/loading.gif" style="width:100%;" alt="請稍待片刻" border="0" />';
			getPostPicture();
			$.ajax({
		        url: "http://140.121.177.100:8080/NTOUSTU/NTOUSTU",
				data:
				{
					status	:	"all",
					page	:	indexPage,
					dataPerPage:"5"
				},
				type:"POST",
		        success: function (response) 
		        {
					document.getElementById("userData").innerHTML = response;
					//在這邊偷偷把分頁設到第一頁
					selectPage = 1;
		        },
		        dataType: "text",
		        cache: false
		        });
		}
		function getData(status)
		{
			if(selectGroup != status)
			{
				selectGroup = status;
				selectPage = 1;
			}
			document.getElementById("userData2").innerHTML = '<img src="http://140.121.177.100/ntoustu/dataControl/loading.gif" style="width:100%;" alt="請稍待片刻" border="0" />';
			$.ajax({
		        url: "http://140.121.177.100:8080/NTOUSTU/NTOUSTU",
				data:
				{
					status	:	selectGroup,
					page	:	selectPage,
					dataPerPage:"5"
				},
				type:"POST",
		        success: function (response) 
		        {
					document.getElementById("userData2").innerHTML = response;
					//在這邊偷偷把主頁設到第一頁
					indexPage = 1;
		        },
		        dataType: "text",
		        cache: false
		        });
		}
		function changePage(status,url)
		{
			$('#link-content').html('<img src="http://140.121.177.100/ntoustu/dataControl/loading.gif" style="width:100%;" alt="請稍待片刻" border="0" />');
			$.ajax({
				url: "http://140.121.177.100:8080/NTOUSTU/GetPage",
				data:
				{
					status	:	status,
					link	:	url
				},
				type:"POST",
		        success: function (response) 
		        {
					$('#link-content').html(response);			
		        },
		        dataType: "html",
		        cache: false
			
			});
		}
		function getPostPicture()
		{
			$.ajax({
				url: "http://140.121.177.100/ntoustu/dataControl/getPicture.php",
		        success: function (response) 
		        {
					$('#myCarousel').html(response);
					
		        },
		        dataType: "html",
		        cache: false
			});
		}
		function getClubAllPost()
		{
			if(selectGroup != "club")
			{
				selectGroup = "club";
				selectPage = 1;
			}
			$('#userData2').html('<img src="http://140.121.177.100/ntoustu/dataControl/loading.gif" style="width:100%;" alt="請稍待片刻" border="0" />');
			$.ajax({
		        url: "http://140.121.177.100/ntoustu/dataControl/getPost.php",
				data:
				{
					page	:	selectPage,
					dataPerPage:"5"
				},
				type:"GET",
		        success: function (response) 
		        {
					$("#userData2").html(response);
		        },
		        dataType: "html",
		        cache: false
		        });
		}
		function getClubPost(post_ID)
		{
			$.ajax({
				url: "http://140.121.177.100/ntoustu/dataControl/selectPost.php?post_ID="+post_ID,
				data:
				{
					user_number:userNumber
				},
				type:"POST",
		        success: function (response) 
		        {
					
					$('#link-content').html(response);
					
		        },
		        dataType: "html",
		        cache: false
			
			});
		}
		function checkLogin()
		{
			$.ajax({
				url: "http://140.121.177.100/ntoustu/dataControl/loginCheck.php",
				data:
				{
					user_number	:	$("#user_number").val(),
					user_pw		:	$("#user_pw").val()
				},
				type:"POST",
		        success: function (response) 
		        {
					if(response == 1)
					{
						$('#loginPage').html('<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>此帳號等待驗證中哦！趕快去信箱收信吧！<br><a href="http://140.121.177.100/resendcheck.php" style="color:red;">→有驗證信問題嗎？←</a>');
					}
					else if(response == 2)
					{
						$('#loginPage').html('<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right" >Close</a>登入失敗！請檢查您的帳號密碼是否正確！');
					}
					else
					{
						$('#loginArea').html('<p>'+response+'！您好！</p><a href="#" class="ui-btn ui-btn-b" data-rel="close" onclick=logout()>登出</a><a href="#post" class="ui-btn ui-btn-b" data-rel="close" onclick=refreshUpload()>上傳文章</a>');
						$('#loginArea2').html('<p>'+response+'！您好！</p><a href="#" class="ui-btn ui-btn-b" data-rel="close" onclick=logout()>登出</a><a href="#post" class="ui-btn ui-btn-b" data-rel="close" onclick=refreshUpload()>上傳文章</a>');
						userNumber = $("#user_number").val();
						$('#loginPage').html('<a href="#pageone" class="ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><h3>'+response+'！您好！歡迎您的登入！</h3>');
					}
		        },
		        dataType: "html",
		        cache: false
			
			});
		}
		function logout()
		{
			$('#loginArea').html('<a href="#login" class="ui-btn ui-btn-b" data-rel="close">我要登入</a>');
			$('#loginArea2').html('<a href="#login" class="ui-btn ui-btn-b" data-rel="close">我要登入</a>');
			$('#loginPage').html('<img src="http://140.121.177.100/ntoustu/dataControl/loading.gif" alt="請稍待片刻" border="0" />');
			userNumber = null;
		}
		function getUserNumber()
		{
			return userNumber;
		}
		function getEdit(post_ID)
		{
			$('#post_area').html('<iframe src="http://140.121.177.100/ntoustu/dataControl/editPost.php?user_number='+userNumber+'&post_ID='+post_ID+'" style="width:100%;height:700px;border:none;"></iframe>');
		}
		function editPost(post_ID)
		{
			$.ajax({
				url: "http://140.121.177.100/ntoustu/dataControl/changePost.php",
				data:
				{
					post_ID:post_ID,
					post_title : $("#edit_post_title").val(),
					post_start : $("#edit_post_start").val(),
					post_end : $("#edit_post_end").val(),
					post_content : $("#edit_post_content").val()
				},
				type:"POST",
		        success: function (response) 
		        {
					alert(response);	
		        },
		        dataType: "html",
		        cache: false
			
			});
		}
		function deletePost(post_ID)
		{
			$.ajax({
				url: "http://140.121.177.100/ntoustu/dataControl/deletePost.php",
				data:
				{
					post_ID:post_ID
				},
				type:"POST",
		        success: function (response) 
		        {
				if(response == 0)
					{
						alert('刪除成功囉！');
					}
					else
					{
						alert('刪除失敗啦！QQ');
					}
		        },
		        dataType: "html",
		        cache: false
			
			});
		}
		function refreshUpload()
		{
			$('#post_area').html('<iframe src="http://140.121.177.100/ntoustu/dataControl/upload/upform.php?user_number='+userNumber+'" style="width:100%;height:700px;border:none;"></iframe>');
		}
		function changeIndexPage(status)
		{
			//0 = 上一頁 ;1 = 下一頁
			if(status == 0)
			{
				if(indexPage == 1)
				{
					alert("您已經在第一頁囉！無法換頁！");
				}
				else
				{
					indexPage = indexPage - 1;
					getAllData();
				}
			}
			else if(status == 1)
			{
				indexPage = indexPage + 1;
				getAllData();
			}
		}
		function changeSelectPage(status)
		{
			//0 = 上一頁 ;1 = 下一頁
			if(status == 0)
			{
				if(selectPage == 1)
				{
					alert("您已經在第一頁囉！無法換頁！");
				}
				else
				{
					selectPage = selectPage - 1;
					if(selectGroup != "club")
					{
						getData(selectGroup);
					}
					else
					{
						getClubAllPost();
					}
				}
			}
			else if(status == 1)
			{
				selectPage = selectPage + 1;
				if(selectGroup != "club")
				{
					getData(selectGroup);
				}
				else
				{
					getClubAllPost();
				}
			}
		}