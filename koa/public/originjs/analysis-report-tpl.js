module.exports = {
	_ANALYSETPL:
	'<div id="modal-black-masking" class="hide"></div>'+
	'<div class="analyse-report-wrap">'+
		'<div class="report-header">'+
			'<img src="/scss/images/score-analysis-banner.png" alt="" class="header-bg">'+
			'<p class="data-origin-header">本报告由&nbsp;<span class="yellow-col goto-wmzy-pro-intro">完美志愿</span>&nbsp;提供</p>'+
			'<div class="report-summary">'+
				'<div class="beveled-boder" id="score-rank-wrap">'+
					'<script id="score-rank-tpl" type="text/template">'+
						'<p class="loc-subject"><&= data.loc_provinc_name&> — <&= data.loc_wenli&></p>'+
						'<ul class="score-rank">'+
							'<li class="about-score">'+
								'<span class="score-key">你的成绩：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
								'<span class="score-value"><em class="helvetica-font"><&= data.score&></em> 分</span>'+
							'</li>'+
							'<li class="score-rank-divider"></li>'+
							'<& if(data.rank) {&>'+
							'<li class="about-ranking">'+
								'<span class="rank-key">经推算，省排名约：</span>'+
								'<span class="rank-value">第 <em class="helvetica-font"><&= data.rank&></em> 名</span>'+
							'</li>'+
							'<&}&>'+
						'</ul>'+
					'</script>'+
			'</div>'+
			'<ul class="summary-items" id="summary-items-wrap">'+
				'<script id="summary-items-tpl" type="text/template">'+
					'<& if(data.exp_sch && data.adm_ratio!=null && data.adm_ratio>=0 && data.score_gap){ &>'+
					'<li class="item-detail">'+
						'<i class="iconfont icon-sch-gap id-first"></i>'+
						'<&if(data.score_gap &&　data.score_gap<=-5){&>'+
						'<span>你的成绩比该校的最低分高出约<em class="black-strong helvetica-font">&nbsp;<&=Math.abs(data.score_gap)&>&nbsp;</em>分</span>'+
						'<&}else if(data.score_gap && data.score_gap<=5){&>'+
						'<span>以你目前的成绩，勉强可以考上该校</span>'+
						'<&}else if(data.score_gap){&>'+
						'<span>目标学校<em class="black-strong">&nbsp;<&= data.exp_sch&>&nbsp;</em>的录取概率为<em class="black-strong helvetica-font">&nbsp;<&= data.adm_ratio&>%&nbsp;</em>，距离该校还有<em class="black-strong helvetica-font">&nbsp;<&= data.score_gap&>&nbsp;</em>分的差距</span>'+
						'<&}&>'+
					'</li>'+
						'<&if(data.recommend_sch){&>'+
						'<li class="item-detail">'+
							'<i class="iconfont icon-roc-sch id-second"></i>'+
							'<span>你的分数还可以考上<em class="black-strong">&nbsp;<&= data.recommend_sch&>&nbsp;</em>等<em class="black-strong helvetica-font">&nbsp;<&= data.recommend_sch_num&>&nbsp;</em>所<&= data.batch_name&>学校</span>'+
						'</li>'+
						'<&}&>'+
						'<&}else{&>'+
						'<&if(data.recommend_sch){&>'+
							'<li class="item-detail">'+
								'<i class="iconfont icon-roc-sch id-second"></i>'+
								'<span>你的分数可以考上<em class="black-strong">&nbsp;<&= data.recommend_sch&>&nbsp;</em>等<em class="black-strong helvetica-font">&nbsp;<&= data.recommend_sch_num&>&nbsp;</em>所<&= data.batch_name&>学校</span>'+
							'</li>'+
						'<&}&>'+
					'<&}&>'+
					'<&if(data.choosed_sch){&>'+
					'<li class="item-detail">'+
						'<i class="iconfont icon-pop-sch id-third"></i>'+
						'<span>近三年与你成绩相近的人当中，被<em class="black-strong">&nbsp;<&= data.choosed_sch&>&nbsp;</em>录取的考生最多<em class="black-strong">&nbsp;(<&= data.stu_count&>人)&nbsp;</em></span>'+
					'</li>'+
					'<&}&>'+
				'</script>'+
			'</ul>'+
		'</div>'+
	'</div>>'
};