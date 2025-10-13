export class BaseService {
  orderQuery(sortOrder: string[], orderBy: string[]) {
    const orderData: Record<string, 'ASC' | 'DESC'> = {};
    orderBy.forEach((field, index) => {
      const fieldCamel = this.snakeToCamel(orderBy[index]);
      const direction =
        (sortOrder[index]?.toUpperCase() ?? 'DESC') === 'DESC' ? 'DESC' : 'ASC';
      orderData[fieldCamel] = direction;
    });

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
