import {
  CaseType,
  deserialize,
  DocumentObject,
  serialize,
} from "jsonapi-fractal";
import pluralize from "pluralize";

export const serialized = <T>(
  data: T,
  type: string,
  relationships?: string[]
): DocumentObject => {
  const serialized = serialize(data, type, {
    relationships,
    changeCase: CaseType.snakeCase,
  });

  const pluralized = Object.assign(serialized);

  if (relationships) {
    relationships.forEach((relationship) => {
      pluralized.data.relationships[relationship].data.type =
        pluralize(relationship);
    });
  }

  return pluralized;
};

export const deserialized = <T>(response: DocumentObject): T =>
  deserialize(response, { changeCase: CaseType.camelCase }) as T;
