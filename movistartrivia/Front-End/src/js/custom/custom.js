/* 
 * Version: v1.0
 * Author:  Luis Rojas
 * Created on : Dec 10, 2015
 * Custom scripts
 
 */ 


//Questions Accordion
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);