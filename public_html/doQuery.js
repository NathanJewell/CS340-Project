let BaseApiUrl = "http://flip2.engr.oregonstate.edu:5267/"

var assembleQuery = function(formParent) {
    data = {};
    for (c in formParent.children(".form-input").toArray()) {
        child = $(c);
        key = child.attr("tag");
        val = child.attr("value");
        data[key] = val
    }
    return data;
    //for child of form parent with "tag" attribute
    //add to object a new attribute with key=valueof("tag"), value=formFieldValue
    //return json object
}

var sendRequest = function(method, uri, qstringData, jsonBodyData) {
    return $.ajax({
        dataType: 'json',
        url: BaseApiUrl + uri + "?" + $.param(qstringData),
        type: method,
        data: jsonBodyData
    });
};

//the api does not distinguish between /collection/<id> and /collection?id=<id>
//ON EACH SUBMIT BUTTON SPECIFY THE FOLLOWING
// class .query, .<METHOD>
// uri <THE URI EXTENSION TO QUERY>
// TBD THIS MAY BE UNEEDED tableid <THE ID OF THE TABLE>
//ON EACH INPUT ELEMENT USE THE form-input class

$('.query.GET').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("GET", submitter.attr("uri"), data, {})
        .done((response) => {
            $('#responseTable').bootstrapTable({
                data: $.parseJSON(data)
            })
        })
        .fail((xhr, status, err) => {
            console.log("Request failed");
            console.log(xhr);
            console.log(status);
        });
    //assemble the query from tagged html elements in the form.
    //create qstring from json query (if any)
    //send GET with ajax
    //do associated callback (create table/display message etc)
});

$('.query.POST').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("POST", submitter.attr("uri"), {}, data);
    //assemble the query from tagged html elements in the form.
    //send POST with ajax
    //do associated callback (create table/display message etc)
});

$('.query.DELETE').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("POST", submitter.attr("uri"), data, {});
    //assemble the query from tagged html elements in the form.
    //create qstring from json query (if any)
    //send GET with ajax
    //do associated callback (create table/display message etc)
});

var currentPage = 1

tryTableLoad = function() {
    //if the table element exists and defines a uri, we are going to load that collection automagically
    var table = $("#dataTable")
    if (table.length) {
        var uri = table.attr("uri");
        var limit = table.attr("limit") || 20;
        if (uri) {
            sendRequest("GET", uri, { "limit": limit, offset: (currentPage - 1) * limit }, {}).done((response) => {
                let columns = []
                console.log(response[0])
                console.log(Object.entries(response[0]));
                for (let [k, v] of Object.entries(response[0])) {
                    console.log(k);
                    console.log(v);
                    if (v != undefined) {
                        columns.push({ title: k, field: k });
                    }
                }
                console.log(columns);
                console.log(response);
                var table = new Tabulator("#dataTable", {
                    height: 400,
                    data: response,
                    layout: 'fitColumns',
                    columns: columns
                });
            }).fail((xhr) => {
                console.log("Request for JSON data failed.")
            });
        }
    }
}

$("#nextPage").on('click', (e) => {
    currentPage += 1;
    $("#currentPage").innerHTML(currentPage);
    tryTableLoad();
});

$("#nextPage").on('click', (e) => {
    if (currentPage >= 1) {
        currentPage -= 1;
        $("#currentPage").innerHTML(currentPage);
        tryTableLoad();
    }
});

$(document).ready(() => {
    tryTableLoad();
});