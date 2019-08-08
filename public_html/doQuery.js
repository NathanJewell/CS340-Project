import { resolve } from "path";

let BaseApiUrl = "flip2.engr.oregonstate.edu:5267/"

var assembleQuery = function(formParent) {
    //for child of form parent with "tag" attribute
    //add to object a new attribute with key=valueof("tag"), value=formFieldValue
    //return json object
}

var sendRequest = function(method, uri, qstringData, jsonBodyData) {
    return $.ajax({
        url: BaseApiUrl + uri + "?" + $.param(qstringData),
        type: method,
        data: jsonBodyData
    });

}

//the api does not distinguish between /collection/<id> and /collection?id=<id>
//ON EACH SUBMIT BUTTON SPECIFY THE FOLLOWING
// class .query, .<METHOD>
// uri <THE URI EXTENSION TO QUERY>
// TBD THIS MAY BE UNEEDED tableid <THE ID OF THE TABLE>

$('.query.GET').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("GET", submitter.attr("uri"), data, {})
        .done((response) => {

        })
        .fail((err) => {

        });
    //assemble the query from tagged html elements in the form.
    //create qstring from json query (if any)
    //send GET with ajax
    //do associated callback (create table/display message etc)
});

$('.query.POST').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("POST", submitter.attr("uri"), )
        //assemble the query from tagged html elements in the form.
        //send POST with ajax
        //do associated callback (create table/display message etc)
});

$('.query.DELETE').on('click', (e) => {
    var submitter = $(e.target);
    var data = assembleQuery(submitter.parent('form'));

    sendRequest("POST", submitter.attr("uri"), )
        //assemble the query from tagged html elements in the form.
        //create qstring from json query (if any)
        //send GET with ajax
        //do associated callback (create table/display message etc)
});