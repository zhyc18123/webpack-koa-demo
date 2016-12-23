module.exports = {
    SCHOOL_LIST_ITEM_MODAL_HTML:
        '<script id="school-list-item-modal-tpl" type="text/template">'+
            '<img src="<&= data.icon_url&>" alt="学校logo" class="school-list-img">'+
        '<ul class="school-info">'+
        '<li class="school-name-loc" title="">'+
        '<span class="school-name"><&= data.sch_name&></span>'+
        '<span class="school-loc"><&= data.city&></span>'+
        '</li>'+
        '<li class="school-rank-probability">'+
        '<&if(data.total_rank){&>'+
        '<span class="school-rank"><em class="dot"></em>综合排名<em class="rank-num"><&= data.total_rank&></em></span>'+
        '<&}&>'+
        '<&if(data.adm_ratio){&>'+
        '<span class="enroll-probability"><em class="dot"></em>录取概率<em class="probability-num"><&= data.adm_ratio&>%</em></span>'+
        '<&}&>'+
        '</li>'+
        '<li class="school-label">'+
        '<&if(data.sch_flag.length >= 1){&>'+
        '<span class="school-label-1"><&= data.sch_flag[0]&></span>'+
        '<&if(data.sch_flag[1]){&>'+
        '<span class="school-label-2"><&= data.sch_flag[1]&></span>'+
        '<&}&>'+
        '<&}&>'+
        '<&if(data.sch_type.length > 0){&>'+
        '<span class="school-label-3"><&= data.sch_type[0]&></span>'+
        '<&}&>'+
        '</li>'+
        '</ul>'+
        '</script>',
    schoolListLineChartModalHtml:
    ''
};

