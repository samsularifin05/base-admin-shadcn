/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { readFile } from 'fs/promises';
import path from 'path';
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt untuk nama file
rl.question(
  'Masukkan nama file yang ingin Anda perbarui: ',
  async (fileName) => {
    try {
      const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
      const filePath = path.resolve(currentFileDir, fileName);

      if (!fs.existsSync(filePath)) {
        console.error(`${fileName} tidak ada dalam folder`);
        rl.close();
        return false;
      }

      // Reading the JSON file
      const fileContent = await readFile(filePath, 'utf8');
      const dataJson = JSON.parse(fileContent);
      // console.log(dataJson);

      await generateFormState(dataJson);
      createFolderStructure(dataJson);
      await editRouterFile(dataJson);
      await editReducer(dataJson);
      await editUrlApi(dataJson);
      await editSideLink(dataJson);
      rl.close();
    } catch (error) {
      console.error('Error:', error);
      rl.close();
    }
  }
);

const editUrlApi = async (dataJson) => {
  try {
    const currentFileDir = path.dirname(new URL(import.meta.url).pathname);

    // Tentukan path file urlApi.ts
    const baseFolderPath = path.resolve(
      currentFileDir,
      '../src/components/lib/urlApi.ts'
    );

    // Baca isi file urlApi.ts
    let data = await fs.promises.readFile(baseFolderPath, 'utf8');

    // Ambil data dari dataJson
    const { page, subFolder, endpoin } = dataJson;

    // Regex untuk mendeteksi apakah properti `page` sudah ada
    const pageRegex = new RegExp(`${page}:\\s*{([\\s\\S]*?)}`, 'm');

    if (pageRegex.test(data)) {
      // Jika `page` sudah ada, periksa apakah `subFolder` juga ada
      data = data.replace(pageRegex, (match, innerContent) => {
        const subFolderRegex = new RegExp(`${subFolder}:`);
        if (subFolderRegex.test(innerContent)) {
          console.log(
            `Properti untuk page "${page}" dan subFolder "${subFolder}" sudah ada. Tidak ada perubahan.`
          );
          return match; // Tidak ada perubahan
        }

        // Tambahkan subFolder baru di dalam page
        const newSubFolder = `  ${subFolder}: '${endpoin}',`;
        return `${page}: {\n${innerContent.trim()},\n${newSubFolder}\n}`;
      });
    } else {
      // Jika `page` belum ada, tambahkan keseluruhan page baru
      const newProperty = `
  ${page}: {
    ${subFolder}: '${endpoin}',
  },`;
      data = data.replace(
        /export const urlApi = \{([\s\S]*?)\};/,
        (match, innerContent) => {
          return `export const urlApi = {${innerContent.trim()},${newProperty}\n};`;
        }
      );
    }

    // Tulis perubahan kembali ke file urlApi.ts
    await fs.promises.writeFile(baseFolderPath, data, 'utf8');
    console.log('File urlApi.ts berhasil diperbarui.');
  } catch (err) {
    console.error('Error editing urlApi.ts:', err.message);
  }
};
const editReducer = async (dataJson) => {
  try {
    const currentFileDir = path.dirname(new URL(import.meta.url).pathname);

    // Tentukan path file reducers.ts
    const baseFolderPath = path.resolve(
      currentFileDir,
      '../src/reduxStore/reducers/reducers.ts'
    );

    // Baca isi file reducers.ts
    let data = await fs.promises.readFile(baseFolderPath, 'utf8');

    // Ambil data dari dataJson
    const { namaFile, page } = dataJson;
    const fieldName = namaFile; // Nama reducer yang akan digunakan

    // 1. Tambahkan import jika belum ada
    const reducerImportRegex = new RegExp(
      `^import\\s+${fieldName}Reducer\\s+from\\s+['"]\\.\\./\\.\\./pages/admin/${page}/${namaFile}/redux['"];$`,
      'm'
    );

    if (!reducerImportRegex.test(data)) {
      // Jika import belum ada, tambahkan import baru di bagian atas
      const importStatement = `import ${fieldName}Reducer from "../../pages/admin/${page}/${namaFile}/redux";\n`;
      data = importStatement + data;
    }

    // 2. Cari bagian rootReducer dan tambahkan reducer baru
    const rootReducerRegex =
      /const rootReducer = combineReducers\(({[\s\S]*?})\);/;

    data = data.replace(rootReducerRegex, (match, p1) => {
      const trimmedContent = p1.trim();

      // Periksa apakah reducer sudah ada
      if (trimmedContent.includes(`${fieldName}: ${fieldName}Reducer`)) {
        console.log(`${fieldName}Reducer already exists in rootReducer.`);
        return match; // Tidak ada perubahan jika reducer sudah ada
      }

      // Tambahkan reducer baru
      const newReducer = `,${fieldName}: ${fieldName}Reducer`;

      if (trimmedContent) {
        // Posisi untuk menambahkan setelah reducer tertentu (misal: "utility")
        const insertPosition =
          trimmedContent.indexOf('utility: utilityReducer') +
          'utility: utilityReducer'.length;

        // Memecah dan menambahkan reducer baru
        const beforeInsert = trimmedContent.slice(0, insertPosition);
        const afterInsert = trimmedContent.slice(insertPosition);

        return `const rootReducer = combineReducers(\n${beforeInsert}${newReducer}${afterInsert}\n);`;
      }

      // Jika kosong, tambahkan langsung
      return `const rootReducer = combineReducers(\n${newReducer}\n);`;
    });

    // 3. Simpan perubahan kembali ke file reducers.ts
    await fs.promises.writeFile(baseFolderPath, data, 'utf8');
    console.log('Reducer file updated successfully.');
  } catch (err) {
    console.error('Error editing reducer file:', err);
  }
};

const editSideLink = async (dataJson) => {
  try {
    const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
    const baseFolderPath = path.resolve(
      currentFileDir,
      '../src/router/sidelinks.tsx'
    );

    // Baca file sidelinks.tsx
    let data = await fs.promises.readFile(baseFolderPath, 'utf8');

    const { page, title, subLinks, route } = dataJson;

    // Format untuk subfolder dan subLinks jika ada
    const newSubLinks = subLinks || [
      {
        title: title || 'Default Sub',
        label: '',
        href: route
      }
    ];

    // Cek apakah `page` sudah ada dalam sidelinks
    const pageRegex = new RegExp(`title:\\s*'${toPascalCase(page)}'`, 'g');
    if (pageRegex.test(data)) {
      console.log(`Page "${toPascalCase(page)}" sudah ada di sidelinks.`);

      // Temukan posisi halaman di data
      const pageRegexMatch = new RegExp(
        `(title:\\s*'${toPascalCase(page)}'[\\s\\S]*?sub:\\s*\\[)([\\s\\S]*?)(\\])`,
        'g'
      );
      const match = pageRegexMatch.exec(data);

      if (match) {
        const pageSection = match[0];
        const existingSubLinks = match[2].trim();

        // Mengubah format subLinks yang sudah ada menjadi array objek JS
        const existingSubLinksArray = existingSubLinks
          .split(',\n')
          .map((subLink) => {
            const matchTitle = subLink.match(/title:\s*'(.*?)'/);
            const matchHref = subLink.match(/href:\s*'(.*?)'/);
            return matchTitle && matchHref
              ? { title: matchTitle[1], href: matchHref[1] }
              : null;
          })
          .filter(Boolean); // Menghapus null values yang tidak valid

        // Menggabungkan subLinks baru dengan yang sudah ada tanpa duplikasi
        const uniqueSubLinks = [
          ...existingSubLinksArray,
          ...newSubLinks.filter(
            (newSubLink) =>
              !existingSubLinksArray.some(
                (existing) =>
                  existing.title === newSubLink.title &&
                  existing.href === newSubLink.href
              )
          )
        ];

        // Jika ada perubahan pada subLinks, update data
        const updatedSubLinks = uniqueSubLinks
          .map((subLink) => JSON.stringify(subLink, null, 2).slice(1, -1))
          .join(',\n');

        const updatedData = data.replace(
          pageSection,
          `${pageSection.slice(0, -1)},{\n${updatedSubLinks}\n}  ]`
        );

        // Tulis perubahan kembali ke file sidelinks.tsx
        await fs.promises.writeFile(baseFolderPath, updatedData, 'utf8');
        console.log(
          `Subfolder "${title}" berhasil ditambahkan ke page "${toPascalCase(page)}".`
        );
      }
    } else {
      // Jika `page` belum ada, tambahkan page baru dengan subfolder

      const insertPosition = data.lastIndexOf('];');
      const newData = [
        data.slice(0, insertPosition),
        `  ,{\n    title: '${toPascalCase(page)}',\n    label: '',\n    href: '#',\n    icon: <IconUserShield size={18} />,\n    sub: ${JSON.stringify(newSubLinks, null, 2)}\n  },\n`,
        data.slice(insertPosition)
      ].join('');

      // Tulis perubahan kembali ke file sidelinks.tsx
      await fs.promises.writeFile(baseFolderPath, newData, 'utf8');
      console.log(
        `Page "${toPascalCase(page)}" berhasil ditambahkan ke sidelinks.`
      );
    }
  } catch (error) {
    console.error('Error editing sidelinks file:', error);
  }
};
const editRouterFile = async (dataJson) => {
  try {
    const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
    const baseFolderPath = path.resolve(
      currentFileDir,
      '../src/router/index.tsx'
    );

    // Baca file router
    let data = await fs.promises.readFile(baseFolderPath, 'utf8');

    const { namaFile, route, type, page, subFolder } = dataJson;
    const capitalizedFileName = capitalcase(namaFile);

    // Normalisasi path untuk import
    const importPath = `@/pages/admin/${page}/${subFolder || ''}/ui/form${capitalizedFileName}`;

    // Cek jika tipe adalah 'admin'
    if (type === 'admin') {
      // Regex untuk blok admin
      const adminRouteRegex =
        /path:\s*['"]\/admin['"].*?children:\s*\[(.*?)\]/s;

      const match = data.match(adminRouteRegex);
      if (match) {
        const childrenContent = match[1];

        // Cek apakah route sudah ada di children
        if (!childrenContent.includes(`path: '${route}'`)) {
          const newRoute = `{
            path: '${route}',
            lazy: async () => ({
              Component: (
                await import(
                  "${importPath}"
                )
              ).default
            })
          }`;

          // Tambahkan route jika belum ada
          data = data.replace(adminRouteRegex, (match, childrenContent) =>
            match.replace(
              childrenContent,
              `${childrenContent.trim()},\n${newRoute}`
            )
          );
          console.log(`Route "${route}" added to admin.`);
        } else {
          console.log(`Route "${route}" already exists in admin.`);
        }
      } else {
        console.error('Admin route structure not found in the router file.');
      }
    } else {
      // Jika bukan admin, tambahkan route baru di luar blok admin
      const nonAdminRouteRegex = /children:\s*\[(.*?)\]/s;

      const match = data.match(nonAdminRouteRegex);
      if (match) {
        const childrenContent = match[1];

        // Cek apakah route sudah ada di children
        if (!childrenContent.includes(`path: '${route}'`)) {
          const newRoute = `{
            index: true,
            path: '${route}',
            element: (
              <PrivateRoute role="admin">
                <${capitalizedFileName} />
              </PrivateRoute>
            )
          }`;

          // Tambahkan route jika belum ada
          data = data.replace(nonAdminRouteRegex, (match, childrenContent) =>
            match.replace(
              childrenContent,
              `${childrenContent.trim()},\n${newRoute}`
            )
          );
          console.log(`Route "${route}" added outside admin.`);
        } else {
          console.log(`Route "${route}" already exists.`);
        }
      } else {
        console.error(
          'Non-admin route structure not found in the router file.'
        );
      }
    }

    // Simpan perubahan kembali ke file router
    await fs.promises.writeFile(baseFolderPath, data, 'utf8');
    console.log('Router file updated successfully.');
  } catch (error) {
    console.error('Error editing router file:', error);
  }
};

const generateFormState = async (dataJson) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.resolve(
    currentFileDir,
    `../src/reduxStore/formState/index.ts`
  );

  const { namaFile, type, page, subFolder } = dataJson;

  const fieldName = capitalcase(namaFile); // Nama field dalam format PascalCase

  try {
    // Baca isi file TypeScript yang sudah ada
    let data = await fs.promises.readFile(filePath, 'utf8');

    // Generate import path berdasarkan type dan folder
    const importPath = `@/pages/admin/${page}/${subFolder}/index`;

    // Tambahkan atau perbarui import hanya jika belum ada
    const importRegex = new RegExp(
      `import\\s+\\{([^\\}]*?)\\}\\s+from\\s+["']${importPath}["'];`,
      'm'
    );

    const match = data.match(importRegex);

    if (type === 'admin') {
      const newImportFields = `Request${fieldName}Dto, initial${fieldName}`;
      if (match) {
        const importedFields = match[1].split(',').map((field) => field.trim());
        if (
          !importedFields.includes(`Request${fieldName}Dto`) ||
          !importedFields.includes(`initial${fieldName}`)
        ) {
          const updatedFields = [
            ...new Set([...importedFields, ...newImportFields.split(', ')])
          ].join(', ');
          data = data.replace(
            importRegex,
            `import { ${updatedFields} } from "${importPath}";`
          );
        }
      } else {
        // Jika belum ada import sama sekali untuk path ini, tambahkan import baru
        data = `import { ${newImportFields} } from "${importPath}";\n${data}`;
      }
    }

    // Tambahkan field baru ke interface FormState jika belum ada
    const interfaceRegex =
      /export\s+interface\s+FormStateReduxFom\s+\{([\s\S]*?)\}/;
    data = data.replace(interfaceRegex, (match, p1) => {
      if (!p1.includes(`${fieldName}: Request${fieldName}Dto`)) {
        return `export interface FormStateReduxFom {\n  ${p1.trim()}\n  ${fieldName}: Request${fieldName}Dto;\n}`;
      }
      return match;
    });

    // Tambahkan nilai initial ke initialState jika belum ada
    const initialStateRegex =
      /export\s+const\s+initialState\s*:\s*FormStateReduxFom\s*=\s*\{([\s\S]*?)\};/;

    data = data.replace(initialStateRegex, (match, p1) => {
      // Gunakan regex untuk memastikan bahwa field tidak ada dalam state
      const fieldRegex = new RegExp(
        `\\b${fieldName}:\\s*initial${fieldName}\\b`
      );
      if (!fieldRegex.test(p1)) {
        // Jika field belum ada, tambahkan ke dalam initialState
        return `export const initialState: FormStateReduxFom = {\n  ${p1.trim()},\n  ${fieldName}: initial${fieldName}\n};`;
      }
      // Jika field sudah ada, kembalikan match tanpa perubahan
      return match;
    });

    // Tulis perubahan kembali ke file TypeScript
    await fs.promises.writeFile(filePath, data, 'utf8');
    console.log('File updated successfully.');
  } catch (err) {
    console.error('Error processing file:', err);
  }
};

const createFolderStructure = (dataJson) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);

  //   console.log(dataJson.type)
  let pathFOlder =
    dataJson.type === 'admin'
      ? `admin/${dataJson.page}/${dataJson.subFolder ? dataJson.subFolder : ''}`
      : `${dataJson.page}${dataJson.subFolder ? dataJson.subFolder : ''}`;
  const baseFolderPath = path.resolve(
    currentFileDir,
    `../src/pages/${pathFOlder}`
  );

  let folderName = capitalcase(dataJson.namaFile);

  const foldersToCreate = ['redux', 'service', 'model', 'ui'];

  try {
    // Buat folder utama
    if (!fs.existsSync(baseFolderPath)) {
      fs.mkdirSync(baseFolderPath, { recursive: true });
      console.log(`Folder utama "${baseFolderPath}" dibuat.`);

      // Buat subfolder dan file index.ts
      foldersToCreate.forEach((subFolder) => {
        const subFolderPath = path.join(baseFolderPath, subFolder);
        if (!fs.existsSync(subFolderPath)) {
          fs.mkdirSync(subFolderPath, { recursive: true });
        }

        const indexPath = path.join(subFolderPath, 'index.ts');
        if (!fs.existsSync(indexPath)) {
          fs.writeFileSync(indexPath, ``, 'utf8');
        }

        // Tambahkan file request.dto.ts dan response.dto.ts di folder model
        if (subFolder === 'model') {
          const requestDtoPath = path.join(subFolderPath, 'request.dto.ts');
          const responseDtoPath = path.join(subFolderPath, 'response.dto.ts');
          if (!fs.existsSync(requestDtoPath)) {
            const entries = Object.entries(dataJson.dto.request_dto);
            const dtoFields = entries
              .map(([key, type]) => ` ${key}: ${type};`)
              .join('\n');
            const dtoFieldsIsi = entries
              .map(([key]) => ` ${key}:"",`)
              .join('\n');
            fs.writeFileSync(
              requestDtoPath,
              `export interface Request${folderName}Dto {\n ${dtoFields}\n}\n\nexport const initial${folderName}: Request${folderName}Dto = {\n ${dtoFieldsIsi} \n};\n`,
              'utf8'
            );
          }
          if (!fs.existsSync(responseDtoPath)) {
            const entries = Object.entries(dataJson.dto.response_dto);
            const dtoFields = entries
              .map(([key, type]) => `${key}: ${type};`)
              .join('\n');
            fs.writeFileSync(
              responseDtoPath,
              `export interface Response${folderName}Dto {\n ${dtoFields}\n}\n`,
              'utf8'
            );
          }
          const modelIndexPath = path.join(subFolderPath, 'index.ts');
          fs.writeFileSync(
            modelIndexPath,
            `export * from "./request.dto";\nexport * from "./response.dto";\n`,
            'utf8'
          );
        }
        if (subFolder === 'redux') {
          const typePathRedux = path.join(subFolderPath, 'type.ts');
          if (!fs.existsSync(typePathRedux)) {
            const typeContent = `import { Response${folderName}Dto } from "../model";\nexport interface Get${folderName}Dto {\n  data: Response${folderName}Dto[];\n  meta : {total : number\npage : number\nlimit : number\n}\n}\n\nexport interface ${folderName} {\n  get${folderName}: Get${folderName}Dto;\n}\n\nexport const initialState: ${folderName} = {\n  get${folderName}: {\n    data: [],\n    meta: { total : 0,\n page:0,\n limit : 0 }\n  }\n};\n`;
            fs.writeFileSync(typePathRedux, typeContent, 'utf8');
          }
          const reduxIndex = path.join(subFolderPath, 'index.ts');
          const indexReduxContent = `import { createSlice, PayloadAction } from "@reduxjs/toolkit";\nimport { Get${folderName}Dto, initialState } from "./type";\n\nconst ${folderName}Reducer = createSlice({\n  name: "${folderName}",\n  initialState,\n  reducers: {\n    set${folderName}(state, action: PayloadAction<Get${folderName}Dto>) {\n      state.get${folderName} = action.payload;\n    }\n  }\n});\n\nconst { set${folderName} } = ${folderName}Reducer.actions;\n\nexport { set${folderName} };\n\nexport default ${folderName}Reducer.reducer;\n`;
          fs.writeFileSync(reduxIndex, indexReduxContent, 'utf8');
        }

        if (subFolder === 'service') {
          const serviceIndex = path.join(subFolderPath, 'index.ts');
          let primaryKeyObject = Object.entries(dataJson.form).find(
            ([key, value]) => value.primaryKey === true
          );
          const serviceIndexContent = `
        import { AppDispatch, AppThunk, utilityActions,formActions } from "@/reduxStore";
        import { apiInstance, NotifInfo, NotifSuccess, urlApi,removeFormObject } from '@/components';
        import { Response${folderName}Dto } from "../model";
        import { set${folderName} } from "../redux";
        
        export const get${folderName} = (): AppThunk => {
          return async (dispatch: AppDispatch) => {
            dispatch(utilityActions.setLoading({ table: true }));
            try {
              const response = await apiInstance.get<Response${folderName}Dto[]>(
                urlApi.${dataJson.page}.${dataJson.subFolder}
              );
              dispatch(
                set${folderName}({
                  data: response.data || [],
                  meta: {
                    total: response.data.length,
                    page: 1,
                    limit: 10,
                  },
                })
              );
            } catch (error) {
              dispatch(
                set${folderName}({
                  data: [],
                  meta: {
                    total: 0,
                    page: 0,
                    limit: 10,
                  },
                })
              );
            } finally {
              dispatch(utilityActions.stopLoading());
            }
          };
        };

        export const save${folderName} = (): AppThunk => {
          return async (dispatch: AppDispatch, getState) => {
            dispatch(utilityActions.setLoading({ table: true }));
            try {
              const state = getState();
              const formValues = state.form.${folderName};
              await apiInstance.post(urlApi.${dataJson.page}.${dataJson.subFolder},removeFormObject(formValues, ['${primaryKeyObject[0]}']));
              dispatch(get${folderName}());
              NotifSuccess("${dataJson.title} Berhasil Ditambahkan");
              dispatch(utilityActions.stopLoading());
              dispatch(formActions.resetForm('${folderName}'));
              dispatch(utilityActions.hideModal());
            } catch (error) {
              NotifInfo(error);
              dispatch(utilityActions.stopLoading());
            }
          };
        };

        export const delete${folderName}ById = (id:string | number): AppThunk => {
          return async (dispatch: AppDispatch) => {
            dispatch(utilityActions.setLoading({ table: true }));
            try {
              await apiInstance.delete(urlApi.${dataJson.page}.${dataJson.subFolder}
                + '/' + id);
              dispatch(get${folderName}());
              NotifSuccess('Data berhasil di hapus');
              dispatch(utilityActions.stopLoading());
            } catch (error) {
              NotifInfo(error);
              dispatch(utilityActions.stopLoading());
            }
          };
        };


        export const update${folderName}ById = (): AppThunk => {
          return async (dispatch: AppDispatch, getState) => {
            dispatch(utilityActions.setLoading({ table: true }));
            try {
              const state = getState();
              
              const { ${primaryKeyObject[0]}, ...formValuesWithoutId } = state.form.${folderName};
              await apiInstance.put(
                urlApi.${dataJson.page}.${dataJson.subFolder} + '/' + ${primaryKeyObject[0]},
                formValuesWithoutId
              );
              dispatch(get${folderName}());
              NotifSuccess('Data berhasil di update');
              dispatch(utilityActions.stopLoading());
              dispatch(formActions.resetForm('${folderName}'));
              dispatch(utilityActions.hideModal());
            } catch (error) {
              NotifInfo(error);
              dispatch(utilityActions.stopLoading());
            }
          };
        };


          `;
          fs.writeFileSync(serviceIndex, serviceIndexContent, 'utf8');
        }

        if (subFolder === 'ui') {
          const uiIndex = path.join(subFolderPath, 'index.ts');
          fs.writeFileSync(
            uiIndex,
            `import ${folderName} from "./form${folderName}";\nexport * from "./form";\nexport { ${folderName} };\n`,
            'utf8'
          );

          const formFolderPath = path.join(subFolderPath, 'form');
          const tableFolderPath = path.join(subFolderPath, 'table');
          const validateFolderPath = path.join(subFolderPath, 'validate');

          if (!fs.existsSync(formFolderPath)) {
            fs.mkdirSync(formFolderPath, { recursive: true });
          }

          if (!fs.existsSync(tableFolderPath)) {
            fs.mkdirSync(tableFolderPath, { recursive: true });
          }

          if (!fs.existsSync(validateFolderPath)) {
            fs.mkdirSync(validateFolderPath, { recursive: true });
          }

          // Buat file index.tsx di dalam folder form
          // Buat file index.tsx di dalam folder form
          const validateIndexPath = path.join(validateFolderPath, 'index.tsx');

          fs.writeFileSync(
            validateIndexPath,
            `import * as yup from "yup";\n
          export const validate${capitalcase(folderName)} = yup.object().shape({
          ${Object.entries(dataJson.form)
            .map(([key, value]) => {
              // Tentukan tipe validasi berdasarkan value.type
              let validationType;
              switch (value.type) {
                case 'email':
                  validationType = 'email'; // Validasi email
                  break;
                case 'number':
                  validationType = 'number'; // Validasi number
                  break;
                case 'date':
                  validationType = 'date'; // Validasi date
                  break;
                case 'boolean':
                  validationType = 'boolean'; // Validasi boolean
                  break;
                default:
                  validationType = 'string'; // Default validasi string
              }

              // // Tentukan aturan validasi berdasarkan value.validation
              const validationRule =
                value.validation === 'required'
                  ? `.required("${toPascalCase(key)} is required")`
                  : '.nullable()'; // Null jika optional

              let numberRequired =
                validationType === 'number' &&
                `.transform((value) => {
                return value === 0 ? undefined : Number(value);
              }),`;

              return `${key}: yup.${validationType}()${numberRequired}${validationRule}`;
            })
            .join(',\n')}
          });`,
            'utf8'
          );

          // Buat file index.tsx di dalam folder form
          const formIndexPath = path.join(formFolderPath, 'index.tsx');
          fs.writeFileSync(
            formIndexPath,
            `import { Button, FormPanel, RenderField } from "@/components";
             import {  useAppSelector,useAppDispatch } from '@/reduxStore';
             import { validate${capitalcase(folderName)} } from "../validate";
             import { save${folderName}, update${folderName}ById } from '../../service';
             import { Request${capitalcase(folderName)}Dto } from '../../model';

             const ${folderName} = () => { 
               const utility = useAppSelector((state) => state.utility);  
              const formValues = utility.getModal.data as Request${capitalcase(folderName)}Dto;
               const dispatch = useAppDispatch();
              function onSubmit() {
                if (utility.getModal.isEdit) {
                  dispatch(update${folderName}ById());
                } else {
                  dispatch(save${folderName}());
                }
              }
          
               return (
                 <div className={"grid gap-6"}>
                   <FormPanel        
                     formName={"${capitalcase(folderName)}"}        
                     onSubmit={onSubmit}        
                     validate={validate${folderName}}  
                     initialValues={formValues}
                    >
                     {({ form }) => (
                       <>
                         <div className="grid gap-2">
                           ${Object.entries(dataJson.form)
                             .map(([key, value], index) => {
                               return `
                               <RenderField
                                 control={form.control}
                                 tabIndex={${index}}
                                 label="${toPascalCase(key)}"
                                 ${
                                   value.readOnly
                                     ? `readOnly={utility.getModal.isEdit ? ${value.readOnly.edit} : ${value.readOnly.create}}`
                                     : ''
                                 }
                                 placeholder="Masukkan ${toPascalCase(key)}"
                                 name="${key}"
                                 type="${value.type}"
                               />
                               `;
                             })
                             .join('\n')}
                           <Button
                             type="submit"
                             className="mt-2"
                             loading={utility.getLoading.button}>
                             Submit
                           </Button>
                         </div>
                       </>
                     )}
                   </FormPanel>
                 </div>
               );
             };
          
             export default ${folderName};
            `,
            'utf8'
          );

          // Buat file index.tsx di dalam folder table
          const tableIndexPath = path.join(tableFolderPath, 'index.tsx');
          fs.writeFileSync(
            tableIndexPath,
            `import { DataTable } from "@/components";
            import { columns } from "./column";
            import {  useAppSelector,useAppDispatch } from "@/reduxStore";
            import { get${capitalcase(folderName)} } from "../../service";
          
          const Table${capitalcase(folderName)} = () => {
            const dispatch = useAppDispatch();
          
            useEffect(() => {
              dispatch(get${capitalcase(folderName)}());
            }, [dispatch]);
          
            const selector${capitalcase(folderName)} = useAppSelector(
              (state) => state.${dataJson.subFolder}.get${capitalcase(folderName)}
            );
          
            return (
              <DataTable
                columns={columns}
                data={selector${capitalcase(folderName)}.data || []}
                titleButton="Tambah ${dataJson.title}"
                total={selector${capitalcase(folderName)}.meta.total}
                page={selector${capitalcase(folderName)}.meta.page}
                limit={selector${capitalcase(folderName)}.meta.limit}
                onPageChange={() =>
                  dispatch(get${capitalcase(folderName)}())
                }
              />
            );
          };
          
          export default Table${capitalcase(folderName)};
          `,
            'utf8'
          );

          // Buat file column.tsx di dalam folder table
          const tableColumnPath = path.join(tableFolderPath, 'column.tsx');
          let primaryKeyObject = Object.entries(dataJson.form).find(
            ([key, value]) => value.primaryKey === true
          );
          fs.writeFileSync(
            tableColumnPath,
            `/* eslint-disable react-hooks/rules-of-hooks */
            import { ColumnDef } from "@tanstack/react-table";\n
            import {
              Button,
              DropdownMenu,
              DropdownMenuContent,
              DropdownMenuItem,
              DropdownMenuLabel,
              DropdownMenuTrigger
            } from '@/components';
            import { Response${capitalcase(folderName)}Dto } from "../../model";
            import { MoreHorizontal } from 'lucide-react';
            import { utilityActions,useAppDispatch,formActions } from '@/reduxStore';
            import { delete${capitalcase(folderName)}ById } from '../../service';

            
          export const columns: ColumnDef<Response${capitalcase(folderName)}Dto>[] = [
            {
              header: "No",
              cell: ({ row }) => {
                return row.index + 1;
              },
            },
            ${Object.entries(dataJson.table.column)
              .map(
                ([key]) => `{
              accessorKey: "${key}",
              header: "${toPascalCase(key)}"
            }`
              )
              .join(',\n')},

               {
                  id: 'actions',
                  enableHiding: false,
                  cell: ({ row }) => {
                    const dispatch = useAppDispatch();
                    return (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              dispatch(
                                utilityActions.showModal({
                                  isModalShow: true,
                                  isEdit: true
                                })
                              );
                              dispatch(
                                formActions.setValue({
                                  form: '${capitalcase(folderName)}',
                                  values: row.original
                                })
                              );
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                           onClick={() => dispatch(delete${capitalcase(folderName)}ById(row.original.${primaryKeyObject[0]}))}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }
                }
          ];
          \n`,
            'utf8'
          );
          const formData = path.join(subFolderPath, `form${folderName}.tsx`);
          const masterFormIndex = `import { ModalGlobal, PanelAdmin } from "@/components";\nimport Form${folderName} from "./form";\nimport { useAppSelector } from "@/reduxStore";\nimport Table${folderName} from "./table";\n\nconst ${folderName} = () => {\n  const modal = useAppSelector((state) => state.utility.getModal);\n\n  return (\n    <PanelAdmin>\n      <Table${folderName} />\n      <ModalGlobal formName="${folderName}"
          \n        title={\`\${modal.isEdit ? "Edit" : "Tambah"} Data\`}>\n        <Form${folderName} />\n      </ModalGlobal>\n    </PanelAdmin>\n  );\n};\n\nexport default ${folderName};\n`;
          fs.writeFileSync(formData, masterFormIndex, 'utf8');
        }
      });

      // Buat file index.ts di dalam folder utama
      const mainIndexPath = path.join(baseFolderPath, 'index.ts');
      if (!fs.existsSync(mainIndexPath)) {
        fs.writeFileSync(
          mainIndexPath,
          `import { ${capitalcase(folderName)} } from "./ui";\nexport * from "./model";\nexport * from "./redux";\nexport * from "./ui";\nexport * from "./service";\nexport { ${capitalcase(folderName)} }`,
          'utf8'
        );
      }
      const urlApiPath = path.resolve(
        currentFileDir,
        '../src/shared/urlApi/index.ts'
      );
      if (fs.existsSync(urlApiPath)) {
        const urlApiContent = fs.readFileSync(urlApiPath, 'utf8');
        const updatedUrlApiContent = urlApiContent.replace(
          /};\s*$/,
          `,\n  ${folderName.toLowerCase()}:"${folderName.toLowerCase()}",\n};`
        );
        fs.writeFileSync(urlApiPath, updatedUrlApiContent, 'utf8');
      }
      console.log(`Folder structure for ${folderName} created successfully.`);

      rl.close();
    }
  } catch (err) {
    console.error('Error:', err);
    rl.close();
  }
};

function capitalcase(str) {
  if (typeof str !== 'string') {
    throw new Error('Input harus berupa string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
  return str
    .replace(/_/g, ' ') // Ganti underscore dengan spasi
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Menambahkan spasi antara huruf kecil dan kapital
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Ubah huruf pertama setiap kata menjadi kapital
}
