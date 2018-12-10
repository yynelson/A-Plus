// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function DOMtoString(document_root) {
    var html = [],
        node = document_root.firstChild;
    var course_name = (document_root.getElementsByClassName('sidebar--title')[0].textContent);
    var assignment_name = document_root.getElementsByClassName('submissionOutlineHeader--assignmentTitle')[0].textContent;
    html.push( course_name + ": " +assignment_name);
    var student_name = document_root.getElementsByClassName('submissionOutlineHeader--groupMember')[0].textContent;
    html.push(student_name);
    var a = document_root.getElementsByClassName('submissionOutlineQuestion--title submissionOutlineQuestion--title-leafQuestion');
    var i = 0;
    var wrong_ques = "";
    var all_scores = "";
    for (i; i < a.length; i++){
        var question = a[i];
        var score = question.nextSibling;
        var b = score.textContent.split("/")
        b[0].trim();
        b[1].trim();
        b[1] = b[1].substr(0, b[1].indexOf('p'));
        var s = score.textContent.replace(/\s/g, '');
        var n = s.search("pt");
        all_scores += s.substring(0,n);
        all_scores += ",";
        //if (b[0][0] != b[1][1]){
        wrong_ques += question.getAttribute("aria-controls") +":\t"+ score.textContent;
        wrong_ques += "\n";
        //}
    }

    //download("hello.txt", html);
    html.push(wrong_ques);
    html.push(all_scores.substring(0,all_scores.length-1));
  


    return html;
    // var b = a[0].nextSibling;
    // return a[0].innerHTML+b.textContent\n  // while (node) {
    /*var i = 0;
    for(i; i < a.length(); i++){
        node = a[i];
        html += i;
        /*
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        //node = node.nextSibling;
    }*/




    return html;
}


chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});