import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';

export const DEFAULT_FEATURE_FLAGS = [
  FeatureFlagKey.IsEventObjectEnabled,
  FeatureFlagKey.IsAirtableIntegrationEnabled,
  FeatureFlagKey.IsPostgreSQLIntegrationEnabled,
  FeatureFlagKey.IsStripeIntegrationEnabled,
  //   FeatureFlagKey.IsCopilotEnabled,
  FeatureFlagKey.IsFreeAccessEnabled,
  FeatureFlagKey.IsFunctionSettingsEnabled,
  FeatureFlagKey.IsWorkflowEnabled,
  FeatureFlagKey.IsMessageThreadSubscriberEnabled,
  FeatureFlagKey.IsSSOEnabled,
  FeatureFlagKey.IsGmailSendEmailScopeEnabled,
  //   FeatureFlagKey.IsAnalyticsV2Enabled,
  FeatureFlagKey.IsUniqueIndexesEnabled,
  FeatureFlagKey.IsMicrosoftSyncEnabled,
  FeatureFlagKey.IsAdvancedFiltersEnabled,
  FeatureFlagKey.IsAggregateQueryEnabled,
  FeatureFlagKey.IsFavoriteFolderEnabled,
  FeatureFlagKey.IsFavoriteFolderEntityEnabled,
  FeatureFlagKey.IsViewGroupsEnabled,
];
