/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PostTypeOptions from './post-type-options';
import SpinnerButton from './spinner-button';

/**
 * Displays additional options for customising an export
 *
 * Allows the user to select whether Pages, Posts and Feedback are
 * exported. Posts and Pages can also be filtered by Authors, Statuses,
 * and Date.
 */
const AdvancedSettings = React.createClass( {
	displayName: 'AdvancedSettings',

	propTypes: {
		// Event handlers
		onSelectPostType: PropTypes.func.isRequired,
		onClickExport: PropTypes.func.isRequired,

		// Data
		postType: PropTypes.string
	},

	render() {
		return (
			<div className="exporter__advanced-settings">
				<h1 className="exporter__advanced-settings-title">
					{ this.translate( 'Select specific content to export' ) }
				</h1>
				<p className="exporter__advanced-settings-description">
					{ this.translate(
						'Use the options below to select a specific content ' +
						'type to download. You can select Posts, Pages, ' +
						'or Feedback, and filter by the listed parameters. ' +
						'After making your selection you can download your ' +
						'content in an .xml file.' ) }
				</p>
				<div className="exporter__advanced-settings-row">
					<PostTypeOptions postType="post" legend={ this.translate( 'Posts' ) } />
					<PostTypeOptions postType="page" legend={ this.translate( 'Pages' ) } />
					<PostTypeOptions postType="feedback"
						legend={ this.translate( 'Feedback' ) }
						description={ this.translate( 'Survey results etc.' ) }
					/>
				</div>
				<SpinnerButton
					className="exporter__export-button"
					disabled={ ! this.props.postType }
					loading={ this.props.shouldShowProgress }
					isPrimary={ true }
					onClick={ this.props.onClickExport }
					text={ this.translate( 'Export Selected Content' ) }
					loadingText={ this.translate( 'Exporting…' ) } />
			</div>
		);
	}
} );

const mapStateToProps = ( state ) => {
	const siteId = state.ui.selectedSiteId;
	return {
		siteId
	};
};

export default connect( mapStateToProps )( AdvancedSettings );
