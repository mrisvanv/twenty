import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';

export const DEFAULT_FEATURE_FLAGS: FeatureFlagKey[] = [
  FeatureFlagKey.IsFunctionSettingsEnabled,
  FeatureFlagKey.IsWorkflowEnabled,
  FeatureFlagKey.IsMessageThreadSubscriberEnabled,
  FeatureFlagKey.IsGmailSendEmailScopeEnabled,
  FeatureFlagKey.IsAdvancedFiltersEnabled,
  FeatureFlagKey.IsAggregateQueryEnabled,
  FeatureFlagKey.IsFavoriteFolderEnabled,
  FeatureFlagKey.IsFavoriteFolderEntityEnabled,
  FeatureFlagKey.IsViewGroupsEnabled,
];
