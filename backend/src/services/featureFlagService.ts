import * as featureFlagRepository from "../repositories/featureFlagRepository";

export async function getAllFeatureFlags() {
  return await featureFlagRepository.getAll();
}

export async function updateFeatureFlag(name: string, status: boolean) {
  return await featureFlagRepository.update(name, status);
}
