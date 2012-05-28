(function(){

	Layerglue.createLazyObjectHierarchy('App.views.controls');

	App.views.controls.ProgressBar = Layerglue.views.BaseView.extend({

		initialize:function(){
			this.$el.append('<div class="bar"></div>');
			this.bar = this.$el.find('.bar');
			this.barMinWidth = 0;

			Layerglue.views.BaseView.prototype.initialize.call(this);
		},

		onAddedToDOM:function(){
			this.barMaxWidth = this.$el.width();
			this.bar.css({width: this.barMinWidth});
		},

		setValue:function(value, animationDuration){

			var targetWidth = ((this.barMaxWidth - this.barMinWidth) * value) + this.barMinWidth;

			if(isNaN(animationDuration) || animationDuration === 0)
			{
				this.bar.css({width:targetWidth});
			}
			else
			{
				this.bar.animate(
				{
					width:targetWidth
				},
				{
					duration: animationDuration,
					complete:_.bind(this.onAnimationComplete, this)
				});
			}
		},

		calculateValue:function(){
			return (this.bar.width() - this.barMinWidth) / (this.barMaxWidth - this.barMinWidth);
		},

		onAnimationComplete:function(){
			this.trigger('animationComplete');
		},

	});

})();
