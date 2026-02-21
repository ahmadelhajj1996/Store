import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
// import notify from "../config/toastr";

// Constants for better maintainability
const COLORS = {
  primary: '#00ACC1', // cyan-500
  gradients: {
    from: '#ffffff', // white
    via: '#e0f7fa', // cyan-50
    to: '#b2ebf2'   // cyan-100
  }
};

const SHAPE_TYPES = {
  LINE: 'line',
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
  DIAMOND: 'diamond'
};

// Utility functions
class RandomUtils {
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomOpacity(min = 0.05, max = 0.3) {
    return this.random(min, max).toFixed(2);
  }

  static randomRotation() {
    return this.randomInt(-45, 45);
  }

  static randomSlantedRotation() {
    return this.randomInt(-60, 60);
  }

  static randomColor(baseColor = COLORS.primary) {
    const opacity = parseFloat(this.randomOpacity());
    return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  }

  static randomShapeType() {
    const shapes = Object.values(SHAPE_TYPES);
    return shapes[this.randomInt(0, shapes.length - 1)];
  }

  static randomPosition() {
    return {
      top: `${this.randomInt(0, 95)}%`,
      left: `${this.randomInt(0, 95)}%`
    };
  }
}

// Shape generator function
const generateRandomShapes = (count, options = {}) => {
  const {
    minSize = 10,
    maxSize = 80,
    minOpacity = 0.05,
    maxOpacity = 0.3,
    color = COLORS.primary,
    types = Object.values(SHAPE_TYPES),
    slantedLinesRatio = 0.4
  } = options;

  return Array.from({ length: count }).map((_, index) => {
    const isSlanted = Math.random() < slantedLinesRatio;
    const type = isSlanted ? SHAPE_TYPES.LINE : types[RandomUtils.randomInt(0, types.length - 1)];
    const size = RandomUtils.randomInt(minSize, maxSize);
    
    return {
      id: `shape-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      type,
      size,
      rotation: isSlanted ? RandomUtils.randomSlantedRotation() : RandomUtils.randomRotation(),
      opacity: parseFloat(RandomUtils.randomOpacity(minOpacity, maxOpacity)),
      color: RandomUtils.randomColor(color),
      position: RandomUtils.randomPosition(),
      animated: Math.random() > 0.3,
      delay: RandomUtils.randomInt(0, 500),
      isSlanted
    };
  });
};

// Decorative shape component with better performance
const DecorativeShape = React.memo(function DecorativeShape({ 
  type = SHAPE_TYPES.LINE, 
  size = 40, 
  rotation = 0, 
  opacity = 0.1, 
  color = COLORS.primary,
  position = {},
  animated = true,
  delay = 0,
  isSlanted = false
}) {
  const baseClasses = `absolute pointer-events-none transition-all duration-700 ${
    animated ? 'group-hover:scale-110 group-hover:opacity-50' : ''
  } ${isSlanted ? 'slanted-shape' : ''}`;
  
  const styles = {
    ...position,
    width: `${size}px`,
    height: type === SHAPE_TYPES.LINE ? '1px' : `${size}px`,
    opacity,
    transform: `rotate(${rotation}deg)`,
    transitionDelay: `${delay}ms`,
  };
  
  const getShapeContent = useMemo(() => {
    switch(type) {
      case SHAPE_TYPES.CIRCLE:
        return <div className="w-full h-full rounded-full border" style={{ borderColor: color }} />;
      case SHAPE_TYPES.SQUARE:
        return <div className="w-full h-full border" style={{ borderColor: color }} />;
      case SHAPE_TYPES.TRIANGLE:
        return (
          <div 
            className="w-full h-full"
            style={{
              borderBottom: `${size}px solid ${color}`,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              opacity,
            }}
          />
        );
      case SHAPE_TYPES.DIAMOND:
        return (
          <div 
            className="w-full h-full border transform rotate-45" 
            style={{ borderColor: color }}
          />
        );
      case SHAPE_TYPES.LINE:
      default:
        return (
          <div 
            className="w-full h-full"
            style={{
              background: isSlanted 
                ? `linear-gradient(${rotation}deg, transparent, ${color}, transparent)`
                : `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity,
              width: isSlanted ? `${size * 1.5}px` : `${size}px`,
            }}
          />
        );
    }
  }, [type, size, color, opacity, rotation, isSlanted]);
  
  return (
    <div className={baseClasses} style={styles}>
      {getShapeContent}
    </div>
  );
});

// Animated gradient background component
const AnimatedGradientBackground = React.memo(function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #ffffff 0%, #e0f7fa 50%, #b2ebf2 100%)',
          animation: 'gradient-shift 15s ease infinite',
          backgroundSize: '200% 200%'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, #ffffff 0%, #b2ebf2 50%, #e0f7fa 100%)',
          animation: 'gradient-shift-reverse 20s ease infinite',
          backgroundSize: '200% 200%'
        }}
      />
    </div>
  );
});

function Reserve() {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  };

  const { t } = useTranslation();
  const [shapes, setShapes] = useState([]);
  const [formShapes, setFormShapes] = useState([]);
  const [inputShapes, setInputShapes] = useState({});

  useEffect(() => {
    // Generate decorative shapes for the form section
    const sectionShapes = generateRandomShapes(RandomUtils.randomInt(6, 12), {
      minSize: 20,
      maxSize: 60,
      minOpacity: 0.03,
      maxOpacity: 0.15,
      slantedLinesRatio: 0.6,
      types: [SHAPE_TYPES.CIRCLE, SHAPE_TYPES.SQUARE, SHAPE_TYPES.DIAMOND, SHAPE_TYPES.LINE]
    });
    
    // Generate shapes for each input field
    const formFieldShapes = ['name', 'phone', 'email'].reduce((acc, field) => {
      acc[field] = generateRandomShapes(RandomUtils.randomInt(1, 3), {
        minSize: 15,
        maxSize: 35,
        minOpacity: 0.05,
        maxOpacity: 0.2,
        types: [SHAPE_TYPES.CIRCLE, SHAPE_TYPES.SQUARE, SHAPE_TYPES.LINE],
        slantedLinesRatio: 0.8
      });
      return acc;
    }, {});
    
    setShapes(sectionShapes);
    setInputShapes(formFieldShapes);
    
    // Generate shapes around form container
    const containerShapes = generateRandomShapes(RandomUtils.randomInt(4, 8), {
      minSize: 25,
      maxSize: 50,
      minOpacity: 0.04,
      maxOpacity: 0.18,
      types: [SHAPE_TYPES.LINE, SHAPE_TYPES.CIRCLE, SHAPE_TYPES.TRIANGLE],
      slantedLinesRatio: 0.7
    });
    setFormShapes(containerShapes);
  }, []);

  const generateFloatingLines = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      const rotation = RandomUtils.randomInt(-75, 75);
      return (
        <div
          key={`floating-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          style={{
            top: `${RandomUtils.randomInt(0, 100)}%`,
            left: `${RandomUtils.randomInt(0, 100)}%`,
            transform: `rotate(${rotation}deg)`,
            opacity: RandomUtils.random(0.02, 0.08),
            animation: `float 20s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      );
    });
  }, []);

  const generateInputDecorations = useCallback((fieldName) => {
    const fieldShapes = inputShapes[fieldName] || [];
    return (
      <>
        {fieldShapes.map(shape => (
          <DecorativeShape key={shape.id} {...shape} animated={false} />
        ))}
        <div 
          className="absolute -top-2 -left-2 w-3 h-px bg-gradient-to-r from-cyan-500 to-transparent transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div 
          className="absolute -top-2 -right-2 w-3 h-px bg-gradient-to-l from-cyan-500 to-transparent transform -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </>
    );
  }, [inputShapes]);

  // Fixed validation schema
  const validationSchema = yup.object({
    name: yup.string().required(t('validation.name.required')),
    email: yup.string().email(t('validation.email.invalid')).required(t('validation.email.required')),
    date: yup.date()
      .required(t('validation.date.required'))
      .min(new Date(1900, 0, 1), t('validation.date.min'))
      .max(new Date(), t('validation.date.max'))
      .typeError(t('validation.date.invalid')),
    phone: yup
      .string()
      .matches(/^\d{10}$/, t('validation.phone.invalid'))
      .required(t('validation.phone.required')),
    time: yup
      .string()
      .required(t('validation.time.required'))
      .matches(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        t('validation.time.format'),
      )
      .test(
        "time-range",
        t('validation.time.range'),
        function (value) {
          if (!value) return false;
          const [hours, minutes] = value.split(":").map(Number);
          const timeInMinutes = hours * 60 + minutes;
          return timeInMinutes >= 600 && timeInMinutes <= 1320; // 10:00 to 22:00
        },
      ),
  });

  const sendToWhatsApp = (values) => {
    const formattedDate = new Date(values.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const [hours, minutes] = values.time.split(":");
    const formattedTime = `${parseInt(hours, 10) % 12 || 12}:${minutes.padStart(2, "0")} ${
      hours >= 12 ? "PM" : "AM"
    }`;

    const message =
      `*🎯 New Appointment Request*%0A%0A` +
      `*👤 Full Name:* ${values.name}%0A` +
      `*📱 Phone:* ${values.phone}%0A` +
      `*📧 Email:* ${values.email}%0A` +
      `*📅 Date:* ${formattedDate}%0A` +
      `*⏰ Time:* ${formattedTime}%0A%0A` +
      `_This appointment was booked via Basman Alnuaini medical center_`;

    const phoneNumber = "971502948810".replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');

    return { formattedDate, formattedTime };
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Form submitted", values);
    setSubmitting(true);

    try {
      const { formattedDate, formattedTime } = sendToWhatsApp(values);
      // notify("done");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative container border-b-0 pb-8 overflow-hidden">
      <AnimatedGradientBackground />
      
      {/* Section decorative shapes */}
      {shapes.map(shape => (
        <DecorativeShape key={shape.id} {...shape} animated={false} />
      ))}
      
      {/* Additional floating diagonal lines */}
      <div className="absolute inset-0 pointer-events-none">
        {generateFloatingLines}
      </div>
      
      {/* Diagonal cross shapes for decoration */}
      <div className="absolute top-8 right-8 w-16 h-16 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform rotate-45" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -rotate-45" />
      </div>
      
      <div className="relative max-w-2xl md:max-w-4xl mx-auto text-center z-10">
          {/* document.dir == 'rtl' ?   */}
          <h1 className="tracking-widest uppercase font-sans font-bold text-2xl sm:text-4xl text-center block max-w-max mx-auto">
            <span className="text-cyan-500"> لين بوتيك</span>{" "}
          </h1>   
  
      </div>

      <div className="relative pt-12 z-10">
        <div className="relative mx-4 md:w-1/2 md:mx-auto">
          {/* Form container decorative shapes */}
          <div className="absolute inset-0 pointer-events-none">
            {formShapes.map(shape => (
              <DecorativeShape key={shape.id} {...shape} />
            ))}
          </div>
          
          {/* Decorative border elements for form container */}
          <div className="absolute -top-4 -left-4 w-6 h-6 border border-cyan-500/10 rounded-full animate-spin-slow" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 border border-cyan-500/10 rounded-full animate-spin-slow-reverse" />
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-px bg-gradient-to-r from-cyan-500 to-transparent transform rotate-45" />
          <div className="absolute top-0 right-0 w-4 h-px bg-gradient-to-l from-cyan-500 to-transparent transform -rotate-45" />
          <div className="absolute bottom-0 left-0 w-4 h-px bg-gradient-to-r from-transparent to-cyan-500 transform -rotate-45" />
          <div className="absolute bottom-0 right-0 w-4 h-px bg-gradient-to-l from-transparent to-cyan-500 transform rotate-45" />
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount={false}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isSubmitting, isValid, errors, touched }) => {
              console.log("Formik errors:", errors); // Debug line
              console.log("Formik touched:", touched); // Debug line
              
              return (
                <Form className="flex flex-col gap-y-6 relative">
                  {['name', 'phone', 'email'].map((field) => (
                    <div key={field} className="relative flex flex-col gap-y-1 w-full group">
                      <div className="absolute inset-0 pointer-events-none">
                        {generateInputDecorations(field)}
                      </div>
                      
                      <label className="description pl-2 relative text-gray-700">
                        {t(`form.${field}`)}
                        <div className="absolute -left-2 top-1/2 w-1 h-0 bg-gradient-to-b from-cyan-500 to-transparent -translate-y-1/2 group-hover:h-4 transition-all duration-300" />
                      </label>
                      
                      <div className="relative">
                        <Field
                          name={field}
                          type={
                            field === 'email' ? 'email' : 
                            field === 'date' ? 'date' : 
                            field === 'time' ? 'time' : 'text'
                          }
                          placeholder={`Enter your ${field}`}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm 
                                   focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 
                                   transition-all duration-300 group-hover:border-cyan-300 text-gray-900"
                          onInput={field === 'phone' ? (e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                          } : undefined}
                          maxLength={field === 'phone' ? 10 : undefined}
                          inputMode={field === 'phone' ? "numeric" : undefined}
                        />
                        
                        {/* Input decorative line on focus */}
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-500 to-transparent 
                                      group-focus-within:w-full transition-all duration-500" />
                        
                        {/* Fixed ErrorMessage usage with proper positioning */}
                        <div className="min-h-[20px] mt-1">
                          <ErrorMessage name={field}>
                            {(msg) => (
                              <div className="text-xs text-cyan-600 ps-2 animate-fadeIn">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      
                      {/* Field decorative bullet */}
                      <div className="absolute -right-2 top-1/2 w-2 h-2 border border-cyan-500/30 rounded-full 
                                    group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-300">
                        <div className="w-1 h-1 bg-cyan-500/50 rounded-full mx-auto mt-0.5" />
                      </div>
                    </div>
                  ))}

                  <div className="relative mt-12">
                    {/* Button decorative elements */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    
                    <button
                      className="relative text-cyan-600 border-2 border-cyan-600 hover:border-cyan-500 text-md md:text-xl 
                               tracking-widest bg-white hover:bg-cyan-500 hover:text-white w-full sm:w-1/2 mx-auto 
                               flex items-center justify-center gap-2 p-4 rounded-lg font-medium 
                               transition-all duration-300 hover:opacity-90 active:scale-95 
                               overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      {/* Button background shapes */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                        <div className="absolute -top-4 -left-4 w-8 h-8 border border-cyan-500/20 rounded-full" />
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 border border-cyan-500/20 rounded-full" />
                      </div>
                      
                      {/* Button diagonal lines */}
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent 
                                    transform -rotate-45 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent 
                                    transform rotate-45 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                      
                      {isSubmitting ? t('form.submitting') : t('form.confirm')}
                    </button>
                    
                    {/* Button bottom decorative line */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      
      {/* Section bottom decorative line */}
      <div className="relative mt-8 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            style={{
              top: `${RandomUtils.randomInt(10, 90)}%`,
              left: `${RandomUtils.randomInt(10, 90)}%`,
              animation: `float 15s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Add some CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-shift-reverse {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 8s linear infinite reverse;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Reserve;