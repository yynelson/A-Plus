chrome.runtime.onMessage.addListener(function(request, sender) {
  var curr_mess = "";
  if (request.action == "getSource") {
    curr_mess = request.source;
  }

  //message.innerText = curr_mess[2];
  message.innerText = "";
  //var key[] = curr_mess[0];
  var key = {};
  key[curr_mess[0]] = curr_mess[2];
  var courseid;
  var assignmentid;
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    urlarr = url.split('/');
    for(var i = 0; i < urlarr.length; i++){
      if(urlarr[i] == "courses"){
          courseid = urlarr[i+1];
          assignmentid = urlarr[i+3];

          break;
      }
    }
  });
  

  chrome.storage.sync.get(null, function(data){
    if(typeof data[curr_mess[0]] === "undefined"){
      chrome.storage.sync.set(key);
      document.getElementById('insert_here').innerHTML = "";
  	  var allkeys;
  	  chrome.storage.sync.get(null, function(result){
  	    allkeys = Object.keys(result);
  	    //message.innerText = allkeys[0];
  	    var i = 0;
  	    for (i; i < -1; i++){
  	     // alert('ha');
  	    }
  	    //var linebreak = document.createElement('br');
  	    var new_line = document.createElement('br');
  	    for(k in result){
  	      //message.innerText += i;
  	      var checkbox = document.createElement("input");
  	      checkbox.setAttribute("type", "checkbox");
  	      checkbox.setAttribute("class", "cbs");
  	      checkbox.setAttribute("id", k);
  	      var linebreak = document.createElement('br');

  	      var inner_text = document.createElement("span");
  	      inner_text.textContent = k;

  	      var outer = document.createElement("label");
  	      outer.appendChild(checkbox);
  	      outer.appendChild(inner_text);
  	      //document.body.prepend(checkbox, k,linebreak);
  	      document.getElementById('insert_here').prepend(outer, linebreak);  
  	    }
  	    var newly_added = document.createElement("span");
  	    newly_added.textContent = "Newly Uploaded: " + curr_mess[0];
  	    newly_added.setAttribute ("style", "font-style: italic");

  	    document.getElementById('insert_here').prepend(newly_added, new_line);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://aplus.us-east-1.elasticbeanstalk.com/', true);
        var sendparam = '{"assignmentId":"'+curr_mess[0]+'","name":"'+curr_mess[1]+'","scores":"'+ curr_mess[3]+'"}';
        //download('whatever', sendparam);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
          //alert(xhr.status);
          if (xhr.readyState == 4 && xhr.status == 200) {
            //alert(xhr.response);
          }
        }
        xhr.send(sendparam);
  	});
    }
  });


  


  //testing

  // var allkeys;
  // chrome.storage.sync.get(null, function(result){
  //   allkeys = Object.keys(result);
  //   //message.innerText = allkeys[0];
  //   var i = 0;
  //   for (i; i < -1; i++){
  //    // alert('ha');
  //   }
  //   //var linebreak = document.createElement('br');
  //   for(k in result){
  //     //message.innerText += i;
  //     var checkbox = document.createElement("input");
  //     checkbox.setAttribute("type", "checkbox");
  //     checkbox.setAttribute("class", "cbs");
  //     checkbox.setAttribute("id", k);
  //     var linebreak = document.createElement('br');
  //     document.body.prepend(checkbox, k,linebreak);
  //   }
  // });
  

  // chrome.storage.sync.get([key],function(result){
  //    message.innerText = result.key;
  // });

  /*
  chrome.storage.sync.get(['file'],function(result){
    a = message.innerText
    if(result.file != "")
      a += result.file;

      chrome.storage.sync.set({"file": a},function(){
        //alert("caonimabide");
        //alert(a);
      });
  });
  
  chrome.storage.sync.get(['file'],function(result){
     message.innerText = result.file;
  });*/
  //message.innerText = curr_mess;
  
});


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}










function onWindowLoad() {


	// var http = new XMLHttpRequest();
	// var url = 'http://aplus.us-east-1.elasticbeanstalk.com/';
	// var params = '1';
	// http.open('POST', url, true);

	// //Send the proper header information along with the request
	// http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	// http.onreadystatechange = function() {//Call a function when the state changes.
	//     if(http.readyState == 4 && http.status == 200) {
	//         alert(http.responseText);
	//     }
	// }
	// http.send(params);


  //chrome.storage.sync.clear(function(){});
  var allkeys;
  chrome.storage.sync.get(null, function(result){
    allkeys = Object.keys(result);
    //message.innerText = allkeys[0];
    var i = 0;
    for (i; i < -1; i++){
     // alert('ha');
    }
    //var linebreak = document.createElement('br');
    for(k in result){
      //message.innerText += i;
      var checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("class", "cbs");
      checkbox.setAttribute("id", k);
      var linebreak = document.createElement('br');

      var inner_text = document.createElement("span");
  	  inner_text.textContent = k
      var outer = document.createElement("label");
  	  outer.appendChild(checkbox);
  	  outer.appendChild(inner_text);
  	  //document.body.prepend(checkbox, k,linebreak);
  	  document.getElementById('insert_here').prepend(outer,linebreak);
    }
  });


  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    if (chrome.runtime.lastError) {
      //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      message.innerText = "";
    }
  });


  var download_button = document.getElementById('download');
  download_button.addEventListener('click', function(){
    var html = "Aplus report, ,";
    html += "mean,min,25 percentile,median,75percentile,max,importance";
    html += '\n';
    var checked = document.querySelectorAll('.cbs');
    var c = 0;
    var xhr1 = new XMLHttpRequest();
  
    xhr1.open("GET", 'http://aplus.us-east-1.elasticbeanstalk.com/', true);
  
    var res = ''
    xhr1.onreadystatechange = function() {
      if (xhr1.readyState == 4) {

        res = xhr1.responseText;
        var homeworks = res.split('\t');
        
        chrome.storage.sync.get(null, function(all){
          var content = Object.values(all);
          content.reverse();
          for (c; c < -1; c++){}
          for(c = checked.length-1; c >= 0; c--){
            if (checked[c].checked){
              html += checked[c].id;
              html += '\n';
              var problems = content[c].split('\n');
              var assignment_index = -1;

              for(var a = 0; a < homeworks.length; a++){
                if (homeworks[a].split('|')[0] == checked[c].id){
                  assignment_index = a;
                  break;
                }
              }
              var class_stats = homeworks[assignment_index].split('|')[1].split('-');

              for (var i = 0; i < problems.length-1; i ++){
                var score = problems[i].split('\t')[1].split('/');
                var kidscore = score[0].trim();
                var fullscore =   score[1].split(' ')[1];
                if (kidscore != fullscore){
                  html += problems[i].split('\t')[0] + ',';
                  html += problems[i].split('\t')[1] + ',';
                  var importance = 1;

                  for(var j = 0; j < class_stats.length-1; j++){
                    html += (parseFloat(class_stats[j].split(',')[i])*parseFloat(fullscore)).toFixed(2) + ',';
                  }


                  if ((kidscore/fullscore).toFixed(2) < class_stats[3].split(',')[i] || 
                    0.7 > class_stats[3].split(',')[i]){
                    importance = 2;
                  }
                  if ((kidscore/fullscore).toFixed(2) < class_stats[2].split(',')[i] || 
                    0.5 > class_stats[3].split(',')[i]){
                    importance = 3;
                  }
                  html += importance;
                  html += '\n'; 
                }
              }
              
              //html += content[c];
              html += '\n';
              
            }
          }
          download("APlus.csv", html);
        });
      }
    }
    
    xhr1.send();
    
  });


  var clear_button = document.getElementById('clear');
  clear_button.addEventListener('click', function(){
  	var checked = document.querySelectorAll('.cbs');

  	for (c = 0; c < checked.length; c++) {
  		if (checked[c].checked) {
  			chrome.storage.sync.remove(checked[c].id, function(){
  				for (i; i < -1; i++){
  	   				// alert('ha');
  	  			}
  			});
  			// document.getElementById(checked[c].id).nextSibling.textContent = "";
  			// document.getElementById(checked[c].id).remove();
  		}
  	}

  	document.getElementById('insert_here').innerHTML = "";
  	var allkeys;
  	chrome.storage.sync.get(null, function(result){
  	  allkeys = Object.keys(result);
  	  //message.innerText = allkeys[0];
  	  var i = 0;
  	  for (i; i < -1; i++){
  	   // alert('ha');
  	  }
  	  //var linebreak = document.createElement('br');
  	  for(k in result){
  	    //message.innerText += i;
  	    var checkbox = document.createElement("input");
  	    checkbox.setAttribute("type", "checkbox");
  	    checkbox.setAttribute("class", "cbs");
  	    checkbox.setAttribute("id", k);
  	    var linebreak = document.createElement('br');

  	    var inner_text = document.createElement("span");
  	    inner_text.textContent = k
  	    var outer = document.createElement("label");
  	    outer.appendChild(checkbox);
  	    outer.appendChild(inner_text);
  	    //document.body.prepend(checkbox, k,linebreak);
  	    document.getElementById('insert_here').prepend(outer,linebreak);
  	  }
  	});


  });



}

window.onload = onWindowLoad;