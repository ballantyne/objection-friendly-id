"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chi = require('chi-doufu');
module.exports = (options = {}) => {
    options = Object.assign({
        field: 'name',
        use: 'slug'
    }, options);
    return (Model) => {
        return class extends Model {
            $beforeInsert(context) {
                var self = this;
                const toResolve = super.$beforeInsert(context);
                return Promise.resolve(toResolve).then(() => {
                    return self.populateSlug();
                });
            }
            $beforeUpdate(query, context) {
                var self = this;
                const toResolve = super.$beforeUpdate(query, context);
                return Promise.resolve(toResolve).then(() => {
                    return self.populateSlug();
                });
            }
            generateSlug() {
                return chi(this[options.field], options);
            }
            populateSlug() {
                return this[options.use] = this.generateSlug();
            }
        };
    };
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVqQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBZ0MsRUFBRSxFQUFFLEVBQUU7SUFDdEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdEIsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUUsTUFBTTtLQUNaLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFWCxPQUFPLENBQUMsS0FBK0IsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sS0FBTSxTQUFRLEtBQUs7WUFDeEIsYUFBYSxDQUFDLE9BQThCO2dCQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMxQyxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsYUFBYSxDQUFDLEtBQTRCLEVBQUUsT0FBOEI7Z0JBQ3hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDaEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMxQyxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRU8sWUFBWTtnQkFDbEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRU8sWUFBWTtnQkFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNqRCxDQUFDO1NBQ0YsQ0FBQTtJQUNILENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG9iamVjdGlvbiBmcm9tICdvYmplY3Rpb24vdHlwaW5ncy9vYmplY3Rpb24nO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwaW5ncyc7XG5jb25zdCBjaGkgPSByZXF1aXJlKCdjaGktZG91ZnUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9uczp0eXBlcy5GcmllbmRseUlkT3B0aW9ucz17fSkgPT4ge1xuICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgZmllbGQ6ICduYW1lJyxcbiAgICB1c2U6ICdzbHVnJ1xuICB9LCBvcHRpb25zKVxuXG4gIHJldHVybiAoTW9kZWw6b2JqZWN0aW9uLk1vZGVsQ2xhc3M8YW55PikgPT4ge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIE1vZGVsIHtcbiAgICAgICRiZWZvcmVJbnNlcnQoY29udGV4dDpvYmplY3Rpb24uUXVlcnlDb250ZXh0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgdG9SZXNvbHZlID0gc3VwZXIuJGJlZm9yZUluc2VydChjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b1Jlc29sdmUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBzZWxmLnBvcHVsYXRlU2x1ZygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgJGJlZm9yZVVwZGF0ZShxdWVyeTpvYmplY3Rpb24uTW9kZWxPcHRpb25zLCBjb250ZXh0Om9iamVjdGlvbi5RdWVyeUNvbnRleHQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCB0b1Jlc29sdmUgPSBzdXBlci4kYmVmb3JlVXBkYXRlKHF1ZXJ5LCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b1Jlc29sdmUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBzZWxmLnBvcHVsYXRlU2x1ZygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSBnZW5lcmF0ZVNsdWcoKSB7XG4gICAgICAgIHJldHVybiBjaGkodGhpc1tvcHRpb25zLmZpZWxkXSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHByaXZhdGUgcG9wdWxhdGVTbHVnKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tvcHRpb25zLnVzZV0gPSB0aGlzLmdlbmVyYXRlU2x1ZygpO1xuICAgICAgfSBcbiAgICB9XG4gIH0gIFxufVxuIl19
