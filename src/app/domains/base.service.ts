export class BaseService {
  orderQuery(sortOrder: string[], orderBy: string[], defaultOrder: string[]) {
    const orderData: Record<string, 'ASC' | 'DESC'> = {};

    if (orderBy.length > 0) {
      orderBy.forEach((field, index) => {
        const direction =
          (sortOrder[index]?.toUpperCase() ?? 'DESC') === 'DESC'
            ? 'DESC'
            : 'ASC';
        orderData[field] = direction;
      });
    } else {
      const direction =
        (defaultOrder[0]?.toUpperCase() ?? 'DESC') === 'DESC' ? 'DESC' : 'ASC';
      orderData[defaultOrder[0]] = direction;
    }

    return orderData;
  }

  limitOffset(length: number | undefined, start: number | undefined) {
    const take = length != undefined && length ? length : null;
    const skip = start != undefined && start ? (start - 1) * length : 0;
    return { take, skip };
  }

  snakeToCamel(s: string): string {
    return s.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
  }
}
