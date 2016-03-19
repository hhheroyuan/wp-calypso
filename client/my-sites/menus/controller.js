/**
 * External Dependencies
 */
var React = require( 'react' );

/**
 * Internal Dependencies
 */
var getSelectedSite = require( 'client/state/ui/selectors' ).getSelectedSite,
	route = require( 'lib/route' ),
	i18n = require( 'lib/mixins/i18n' ),
	analytics = require( 'analytics' ),
	MainComponent = require( 'components/main' ),
	JetpackManageErrorPage = require( 'my-sites/jetpack-manage-error-page' ),
	itemTypes = require( 'my-sites/menus/menu-item-types' ),
	MenusComponent = require( 'my-sites/menus/main' ),
	notices = require( 'notices' ),
	siteMenus = require( 'lib/menu-data' ),
	titleActions = require( 'lib/screen-title/actions' );

export function menus( context, next ) {
	var analyticsPageTitle = 'Menus',
		basePath = route.sectionify( context.path ),
		site = getSelectedSite( context.store.getState() ),
		baseAnalyticsPath;

	if ( site && site.capabilities && ! site.capabilities.edit_theme_options ) {
		notices.error( i18n.translate( 'You are not authorized to manage settings for this site.' ) );
		return;
	}

	titleActions.setTitle( i18n.translate( 'Menus', { textOnly: true } ), { siteID: context.params.site_id } );

	function createJetpackUpgradeMessage() {
		return React.createElement( MainComponent, null,
			React.createElement( JetpackManageErrorPage, {
				template: 'updateJetpack',
				site: site,
				version: '3.5',
				illustration: '/calypso/images/drake/drake-nomenus.svg',
				secondaryAction: i18n.translate( 'Open Classic Menu Editor' ),
				secondaryActionURL: site.options.admin_url + 'nav-menus.php',
				secondaryActionTarget: '_blank'
			} )
		);
	}

	if ( site && site.jetpack && ! site.hasJetpackMenus ) {
		context.primary = createJetpackUpgradeMessage();
		return next();
	}

	if ( site ) {
		baseAnalyticsPath = basePath + '/:site';
	} else {
		baseAnalyticsPath = basePath;
	}

	analytics.pageView.record( baseAnalyticsPath, analyticsPageTitle );

	context.primary = React.createElement( MenusComponent, {
		siteMenus: siteMenus,
		itemTypes: itemTypes,
		key: siteMenus.siteID,
		site: site
	} );
	next();
};
