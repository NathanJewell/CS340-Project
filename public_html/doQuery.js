//let portChoices = ["5265", "0"]
//var BaseApiUrl = "http://flip2.engr.oregonstate.edu:"
//var goodPort = false;
//for (let port of portChoices) {
    //url = BaseApiUrl + port + "/";
    //console.log(url);
    //try {
        //let res = $.ajax({
            //url : url,
            //type: "GET"
        //});
        //console.log(res);
        //if (res.status) {
            //BaseApiUrl = url;
            //goodPort = true;
            //break;
        //}

    //} catch (e) {
        //continue;
    //}
//}

//if (goodPort) {
    //console.log("Found server.");
//} else {
    //console.log("UNABLE TO CONTACT THE SERVER. PLEASE CONTACT NATHAN JEWELL");
//} 
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
 var BaseApiUrl = "http://flip2.engr.oregonstate.edu:5265/"
//var BaseApiUrl = "http://flip1.engr.oregonstate.edu:6565/"

var currentPage = 1;
var assembleQuery = function(formParent, paginated=false) {
    data = {};
    formParent.find(".form-control").each((i, c) => {
        child = $(c);
        key = child.attr("tag");
        val = child.val();
        quote = child.attr("quoted");
        placeholder = child.attr("placeholder");
        if (key == "id") {
            val = undefined
        }
        if (val == "" && placeholder != undefined && key != "id") {
            val = placeholder
        }
        if (quote == true) {
            val = "\"" + val + "\""
        }
        data[key] = val;
    });
    if (paginated) {
        data["limit"] = $("#resultsTable").attr("limit");
        data["offset"] = (currentPage - 1) * data["limit"];
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


tryTableLoad = function() {
    //if the table element exists and defines a uri, we are going to load that collection automagically
    var table = $("#dataTable")
    if (table.length) {
        var uri = table.attr("uri");
        var limit = table.attr("limit") || 20;
        if (uri) {
            sendRequest("GET", uri, { "limit": limit, offset: (currentPage - 1) * limit }, {}).done((response) => {
                let columns = []
                for (let [k, v] of Object.entries(response[0])) {
                    if (v != undefined) {
                        columns.push({ title: k, field: k });
                    }
                }
                var table = new Tabulator("#dataTable", {
                    height: 600,
                    data: response,
                    layout: 'fitDataFill',
                    columns: columns
                });
            }).fail((xhr) => {
                console.log("Request for JSON data failed.")
            });
        }
    }
}

setTableData = function(tableSelector, data) {
    //if the table element exists and defines a uri, we are going to load that collection automagically
    let columns = []
    for (let [k, v] of Object.entries(data[0])) {
        if (v != undefined) {
            columns.push({ title: k, field: k });
        }
    }
    var table = new Tabulator(tableSelector, {
        height: 75,
        data: data,
        layout: 'fitDataFill',
        columns: columns
    });
}

clearPlaceHolders = function() {
    $(".formfill").find(".form-control").each((i, obj) => {
        if ($(obj).hasClass("validatedID") == false) {
            $(obj).removeAttr("placeholder");
        }
    });
}

clearValues = function() {
    $(".formfill").find(".form-control").each((i, obj) => {
        if ($(obj).hasClass("validatedID") == false) {
            $(obj).val("");
        }
    });
}

enableSubmission = function(text = "Add/Update") {
    $(".POST").removeClass("disabled");
    $(".POST").text(text);
    if (text == "Update") {
        $(".DELETE").removeClass("disabled");
    }
}

disableSubmission = function() {
    $(".POST").addClass("disabled");
    $(".DELETE").addClass("disabled");
}

setFormPlaceHolders = function(id) {
    if ($(".validatedID").length) {
        uri = $(".formfill").attr("uri") + "/" + id;
        sendRequest("GET", uri, {}, {}).done((data) => {
            if (data.length) {
                let o = Object.entries(data[0]);
                for (let [k, v] of o) {
                    if (v != undefined && k != "id") {
                        $("[tag=" + k + "]").attr("placeholder", v);
                    }
                }
                $("#validatorText").text("ID Validated - Updating");
                enableSubmission("Update");
            } else {
                console.log("ID IS INVALID");
                $("#validatorText").text("ID Nonexistent - Do not submit");
                disableSubmission();
                clearPlaceHolders();
            }
        }).fail((xhr, status, err) => {
            console.log(">> error while validating");
            $("#validatorText").text("Cannot Validate That ID");
            disableSubmission()
            clearPlaceHolders();
        });
    }
}

tryValidateIdSetTable = function(e) {
    table = '#' + $(e).parent().find(".table").attr('id');
    statusText = '#' +  $(e).parent().find(".status").attr("id");
    id = $(e).val();
    if(id == ""){
        setTableData(table, [{}]);
        $(statusText).text("ID Does not Exist- Do not submit");
        disableSubmission();
        return;
    }
    uri = $(e).attr("table") + "/" + id;
    sendRequest("GET", uri, {}, {}).done((data) => {
        if (data.length) {
            setTableData(table, data);
            $(statusText).text("ID is Valid - See table for info");
            enableSubmission("Insert");
        } else {
            console.log("ID IS INVALID");
            setTableData(table, [{}]);
            $(statusText).text("ID Does not Exist- Do not submit");
            disableSubmission();
        }
    }).fail((xhr, status, err) => {
        console.log(">> error while validating");
        setTableData(table, [{}]);
        $(statusText).text("Cannot Validate ID");
        disableSubmission()
    });
}

clearTables = function() {
    $(".table").each((e, obj) => {
        id = "#" + $(obj).attr('id');
        setTableData(table, [{}]);
    });
    $(".status").each((e, obj) => {
        $(obj).text("");
    });
}



$(document).ready(() => {

    //the api does not distinguish between /collection/<id> and /collection?id=<id>
    //ON EACH SUBMIT BUTTON SPECIFY THE FOLLOWING
    // class .query, .<METHOD>
    // uri <THE URI EXTENSION TO QUERY>
    // TBD THIS MAY BE UNEEDED tableid <THE ID OF THE TABLE>
    //ON EACH INPUT ELEMENT USE THE form-input class

    $('.query.GET').on('click', (e) => {
        var submitter = $('.formfill');
        var data = assembleQuery(submitter);

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
        var submitter = $('.formfill');
        var data = assembleQuery(submitter, paginated=true);
        console.log("NOW SUBMITTING");

        sendRequest("POST", submitter.attr("uri"), {}, data).done((response, status, xhr) => {
                if ($("#resultsTable").length) {
                    $("#statusText").text("Search Successfull");
                    setTableData("#resultsTable", response)
                } else {
                    $("#statusText").text(JSON.stringify(response));
                }
                clearValues();
                clearTables();
                setFormPlaceHolders($(".validatedID").val());
            }).fail((xhr, status, err) => {
                $("#statusText").text("Request failed, try again. Is the form filled? (Does the PK allready exist?)\n" + JSON.stringify(xhr));
            })
            //assemble the query from tagged html elements in the form.
            //send POST with ajax
            //do associated callback (create table/display message etc)
    });

    $('.query.DELETE').on('click', (e) => {
        var submitter = $('.formfill');
        var data = { id: $(".validatedID").val() };

        sendRequest("DELETE", submitter.attr("uri"), data, {}).done((response) => {
            console.log(response);
            $("#statusText").text(JSON.stringify(response));
            clearValues();
            clearPlaceHolders();
        }).fail((xhr, status, err) => {
            console.log("Request failed.");
            $("#status").text("Request failed, try again sucka.");
        });
        //assemble the query from tagged html elements in the form.
        //create qstring from json query (if any)
        //send GET with ajax
        //do associated callback (create table/display message etc)
    });

    $(".validatedID").on('input', (e) => {
        id = $(e.target).val();
        $("#validatorText").text("No ID Entered - Inserting");
        enableSubmission("Insert");
        if (id != "") {
            setFormPlaceHolders(id);
        } else {
            clearPlaceHolders();
        }
    });

    $(".validatedIDTable").on('input', (e) => {
        tryValidateIdSetTable(e.target);
    });

    $(".btn").on('click', (e) => {
        $(e.target).blur();
    });

    $(document.body).on('click', "#nextPage", (e) => {
        currentPage += 1;
        $("#currentPage").text(currentPage);
        tryTableLoad();
    });

    $(document.body).on('click', "#prevPage", (e) => {
        if (currentPage > 1) {
            currentPage -= 1;
            $("#currentPage").text(currentPage);
            tryTableLoad();
        }
    });

    tryTableLoad();
    clearValues();
    $("#validatorText").text("No ID Entered - Inserting");
    if ($(".validatedID").val() != "") {
        setFormPlaceHolders($(".validatedID").val());
    } else {
        clearPlaceHolders();
        disableSubmission("Update");
        enableSubmission("Insert");
    }
});